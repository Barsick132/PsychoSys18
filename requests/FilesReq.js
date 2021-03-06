const T = require('../constants').TABLES;
const ROLE = require('../constants').ROLE;
const Promise = require('bluebird');

exports.addFiles = (knex, body) => {
    return new Promise((resolve, reject) => {
        const STATUS = {
            NOT_FOUND_ADDED_FILES: 'NOT_FOUND_ADDED_FILES',
            NOT_FOUND_VALID_FILES: 'NOT_FOUND_VALID_FILES',
            NOT_FOUND_MENTAL_MAP: 'NOT_FOUND_MENTAL_MAP',
            UNDEFINED_DESTINATION: 'UNDEFINED_DESTINATION',
            UNKNOWN_ERROR: 'UNKNOWN_ERROR',
            OK: 'OK'
        };

        let result = {};
        let destination;

        knex.transaction(trx => {
            return new Promise((resolve, reject) => {
                if (body.std_id !== undefined) {
                    destination = 'std_id';
                    return Promise.map(body.files, function (file) {
                        return knex.select('std.' + T.STUDENTS.STD_ID, 'mm.' + T.MENTAL_MAP.MM_ID,
                            'file.' + T.FILE.FILE_NAME, 'file.' + T.FILE.FILE_PATH)
                            .from({mm: T.MENTAL_MAP.NAME, std: T.STUDENTS.NAME, file: T.FILE.NAME})
                            .whereRaw('?? = ??', ['mm.' + T.MENTAL_MAP.STD_ID, 'std.' + T.STUDENTS.STD_ID])
                            .andWhereRaw('?? = ??', ['mm.' + T.MENTAL_MAP.MM_ID, 'file.' + T.FILE.MM_ID])
                            .andWhere('std.' + T.STUDENTS.STD_ID, body.std_id)
                            .andWhere('file.' + T.FILE.FILE_NAME, file.file_name)
                            .andWhere('file.' + T.FILE.FILE_PATH, file.file_path);
                    })
                        .then(res => resolve(res))
                        .catch(err => reject(err));
                } else {
                    if (body.tst_id !== undefined) {
                        destination = 'tst_id';
                        return Promise.map(body.files, function (file) {
                            return knex.select('tst.' + T.TESTS.TST_ID,
                                'file.' + T.FILE.FILE_NAME, 'file.' + T.FILE.FILE_PATH)
                                .from({tst: T.TESTS.NAME, file: T.FILE.NAME})
                                .whereRaw('?? = ??', ['tst.' + T.TESTS.TST_ID, 'file.' + T.FILE.TST_ID])
                                .andWhere('tst.' + T.TESTS.TST_ID, body.tst_id)
                                .andWhere('file.' + T.FILE.FILE_NAME, file.file_name)
                                .andWhere('file.' + T.FILE.FILE_PATH, file.file_path);
                        })
                            .then(res => resolve(res))
                            .catch(err => reject(err));
                    } else {
                        if (body.tr_id !== undefined) {
                            destination = 'tr_id';
                            return Promise.map(body.files, function (file) {
                                return knex.select('tr.' + T.TEST_RESULTS.TR_ID,
                                    'file.' + T.FILE.FILE_NAME, 'file.' + T.FILE.FILE_PATH)
                                    .from({tr: T.TEST_RESULTS.NAME, file: T.FILE.NAME})
                                    .whereRaw('?? = ??', ['tr.' + T.TEST_RESULTS.TR_ID, 'file.' + T.FILE.TR_ID])
                                    .andWhere('tr.' + T.TEST_RESULTS.TR_ID, body.tr_id)
                                    .andWhere('file.' + T.FILE.FILE_NAME, file.file_name)
                                    .andWhere('file.' + T.FILE.FILE_PATH, file.file_path);
                            })
                                .then(res => resolve(res))
                                .catch(err => reject(err));
                        } else {
                            reject({message: STATUS.UNDEFINED_DESTINATION})
                        }
                    }
                }
            })
                .then(res => {
                    res = res.filter(arr => arr.length !== 0);
                    res = res.map(arr => arr[0]);

                    if (res.length > 0) {
                        for (let i = 0; i < body.files.length; i++) {
                            if (res.some(item => item.file_name === body.files[i].file_name
                                && item.file_path === body.files[i].file_path)) {
                                body.files.splice(i, 1);
                                i--;
                            }
                        }
                    }

                    if (body.files.length === 0) {
                        throw new Error(STATUS.NOT_FOUND_VALID_FILES);
                    }

                    if (destination === 'std_id') {
                        return knex({std: T.STUDENTS.NAME, mm: T.MENTAL_MAP.NAME})
                            .select(T.MENTAL_MAP.MM_ID)
                            .whereRaw('?? = ??', ['mm.' + T.MENTAL_MAP.STD_ID, 'std.' + T.STUDENTS.STD_ID])
                            .andWhere('std.' + T.STUDENTS.STD_ID, body.std_id);
                    }
                })
                .then(res => {
                    if (destination === 'std_id') {
                        if (res.length === 0)
                            return knex(T.MENTAL_MAP.NAME)
                                .transacting(trx)
                                .insert({std_id: body.std_id})
                                .returning([T.MENTAL_MAP.MM_ID]);
                        else
                            return res;
                    }
                })
                .then(res => {
                    switch (destination) {
                        case 'std_id': {
                            if (res.length === 0) {
                                throw new Error(STATUS.NOT_FOUND_MENTAL_MAP);
                            }
                            return Promise.map(body.files, (file) => {
                                let expansion = file.file.originalname.split('.');
                                expansion = expansion[expansion.length - 1];
                                return knex(T.FILE.NAME)
                                    .transacting(trx)
                                    .insert({
                                        mm_id: res[0].mm_id,
                                        file_name: file.file_name,
                                        file_path: file.file_path,
                                        file_expansion: expansion,
                                        file_size: file.file.size
                                    })
                                    .returning('*');
                            });
                        }
                        case 'tst_id': {
                            return Promise.map(body.files, (file) => {
                                let expansion = file.file.originalname.split('.');
                                expansion = expansion[expansion.length - 1];
                                return knex(T.FILE.NAME)
                                    .transacting(trx)
                                    .insert({
                                        tst_id: body.tst_id,
                                        file_name: file.file_name,
                                        file_path: file.file_path,
                                        file_expansion: expansion,
                                        file_size: file.file.size
                                    })
                                    .returning('*');
                            });
                        }
                        case 'tr_id': {
                            return Promise.map(body.files, (file) => {
                                let expansion = file.file.originalname.split('.');
                                expansion = expansion[expansion.length - 1];
                                return knex(T.FILE.NAME)
                                    .transacting(trx)
                                    .insert({
                                        tr_id: body.tr_id,
                                        file_name: file.file_name,
                                        file_path: file.file_path,
                                        file_expansion: expansion,
                                        file_size: file.file.size
                                    })
                                    .returning('*');
                            });
                        }
                    }
                })
                .then(res => {
                    res = res.filter(arr => arr.length !== 0);
                    res = res.map(arr => arr[0]);

                    if (res.length === 0) {
                        throw new Error(STATUS.NOT_FOUND_ADDED_FILES);
                    }

                    result = {
                        destination: destination,
                        files: res
                    };

                    resolve(result);

                    trx.commit();
                })
                .catch(err => {
                    if (err.message === STATUS.UNDEFINED_DESTINATION ||
                        err.message === STATUS.NOT_FOUND_MENTAL_MAP ||
                        err.message === STATUS.NOT_FOUND_VALID_FILES ||
                        err.message === STATUS.NOT_FOUND_ADDED_FILES) {
                        result = {status: err.message};
                    } else {
                        result = {status: STATUS.UNKNOWN_ERROR};
                    }
                    reject(result);

                    trx.rollback(err);
                })
        });
    })
};

exports.delFilesById = function (knex, files_id_arr) {
    return knex(T.FILE.NAME)
        .whereIn(T.FILE.FILE_ID, files_id_arr)
        .del()
        .returning('*');
};

exports.getFileInfo = function (knex, file_id_arr, user) {
    if (user.roles.find(role => role === ROLE.PSYCHOLOGIST)) {
        return knex(T.FILE.NAME)
            .select()
            .whereIn(T.FILE.FILE_ID, file_id_arr);
    }
    if (user.roles.find(role => role === ROLE.STUDENT)) {
        return knex({afts: 'access_file_tst_std'})
            .select()
            .where('afts.std_id', user.pepl_id)
            .whereIn('afts.file_id', file_id_arr);
    }
};

exports.getFiles = function (knex, body) {
    return new Promise((resolve, reject) => {
        const STATUS = {
            BAD_REQUEST: 'BAD_REQUEST',
            NOT_FOUND_VALID_FILES: 'NOT_FOUND_VALID_FILES',
            UNKNOWN_ERROR: 'UNKONOWN_ERROR'
        };

        let result = {};

        return new Promise((resolve, reject) => {
            if (body.std_id !== undefined) {
                return knex({std: T.STUDENTS.NAME, mm: T.MENTAL_MAP.NAME, file: T.FILE.NAME})
                    .select('file.' + T.FILE.FILE_ID, 'file.' + T.FILE.FILE_NAME,
                        'file.' + T.FILE.FILE_PATH, 'file.' + T.FILE.FILE_DT, 'file.' + T.FILE.FILE_SIZE,
                        'file.' + T.FILE.FILE_EXPANSION)
                    .whereRaw('?? = ??', ['mm.' + T.MENTAL_MAP.STD_ID, 'std.' + T.STUDENTS.STD_ID])
                    .whereRaw('?? = ??', ['mm.' + T.MENTAL_MAP.MM_ID, 'file.' + T.FILE.MM_ID])
                    .where('std.' + T.STUDENTS.STD_ID, body.std_id)
                    .orderBy('file.' + T.FILE.FILE_DT)
                    .then(res => resolve(res))
                    .catch(err => reject(err));
            } else {
                if (body.tr_id !== undefined) {
                    return knex({tr: T.TEST_RESULTS.NAME, file: T.FILE.NAME})
                        .select('file.' + T.FILE.FILE_ID, 'file.' + T.FILE.FILE_NAME,
                            'file.' + T.FILE.FILE_PATH, 'file.' + T.FILE.FILE_DT, 'file.' + T.FILE.FILE_SIZE,
                            'file.' + T.FILE.FILE_EXPANSION)
                        .whereRaw('?? = ??', ['tr.' + T.TEST_RESULTS.TR_ID, 'file.' + T.FILE.TR_ID])
                        .where('tr.' + T.TEST_RESULTS.TR_ID, body.tr_id)
                        .orderBy('file.' + T.FILE.FILE_DT)
                        .then(res => resolve(res))
                        .catch(err => reject(err));
                } else {
                    if (body.tst_id !== undefined) {
                        return knex({tst: T.TESTS.NAME, file: T.FILE.NAME})
                            .select('file.' + T.FILE.FILE_ID, 'file.' + T.FILE.FILE_NAME,
                                'file.' + T.FILE.FILE_PATH, 'file.' + T.FILE.FILE_DT, 'file.' + T.FILE.FILE_SIZE,
                                'file.' + T.FILE.FILE_EXPANSION)
                            .whereRaw('?? = ??', ['tst.' + T.TESTS.TST_ID, 'file.' + T.FILE.TST_ID])
                            .where('tst.' + T.TESTS.TST_ID, body.tst_id)
                            .orderBy('file.' + T.FILE.FILE_DT)
                            .then(res => resolve(res))
                            .catch(err => reject(err));
                    } else {
                        result = {message: STATUS.BAD_REQUEST};
                        reject(result);
                    }
                }
            }
        })
            .then(res => {
                if (res.length === 0) {
                    throw new Error(STATUS.NOT_FOUND_VALID_FILES)
                }

                resolve(res);
            })
            .catch(err => {
                if (err.message === STATUS.NOT_FOUND_VALID_FILES ||
                    err.message === STATUS.BAD_REQUEST) {
                    result = {status: err.message};
                } else {
                    result = {status: STATUS.UNKNOWN_ERROR};
                }
                reject(result);
            });
    });
};

exports.updFile = function (knex, body) {
    const STATUS = {
        BAD_REQUEST: 'BAD_REQUEST'
    };

    return new Promise((resolve, reject) => {
        if (body.file_name === undefined &&
            body.file_path === undefined) {
            reject({message: STATUS.BAD_REQUEST});
        }

        let reqObj = {};
        if (body.file_name !== undefined) {
            reqObj.file_name = body.file_name;
        }
        if (body.file_path !== undefined) {
            reqObj.file_path = body.file_path;
        }

        return knex(T.FILE.NAME)
            .update(reqObj)
            .where(T.FILE.FILE_ID, body.file_id)
            .returning([T.FILE.FILE_ID, T.FILE.FILE_NAME, T.FILE.FILE_PATH, T.FILE.FILE_SIZE,
                T.FILE.FILE_EXPANSION, T.FILE.FILE_DT])
            .then(res => resolve(res))
            .catch(err => reject(err));
    });

};