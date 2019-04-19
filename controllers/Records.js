'use strict';

var utils = require('../utils/writer.js');
var Records = require('../service/RecordsService');

module.exports.cancelRecord = function cancelRecord(req, res, next) {
    if (req.error) {
        utils.writeJson(res, {status: req.error});
        return;
    }

    const body = req.swagger.params['body'].value;
    Records.cancelRecord(req, body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.changeRecord = function changeRecord(req, res, next) {
    var body = req.swagger.params['body'].value;
    Records.changeRecord(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.getJournal = function getJournal(req, res, next) {
    var body = req.swagger.params['body'].value;
    Records.getJournal(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.getOneRecord = function getOneRecord(req, res, next) {
    var body = req.swagger.params['body'].value;
    Records.getOneRecord(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.getRecordsFromWD = function getRecordsFromWD(req, res, next) {
    var body = req.swagger.params['body'].value;
    Records.getRecordsFromWD(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.getEmpGraphic = function getEmpGraphic(req, res, next) {
    if (req.error) {
        utils.writeJson(res, {status: req.error});
        return;
    }

    const body = req.swagger.params['body'].value;
    Records.getEmpGraphic(req, body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.moveRecord = function moveRecord(req, res, next) {
    var body = req.swagger.params['body'].value;
    Records.moveRecord(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.setJournal = function setJournal(req, res, next) {
    var body = req.swagger.params['body'].value;
    Records.setJournal(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.setToRecord = function setToRecord(req, res, next) {
    if (req.error) {
        utils.writeJson(res, {status: req.error});
        return;
    }

    const body = req.swagger.params['body'].value;
    Records.setToRecord(req, body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.setPersonalGraphic = function setPersonalGraphic(req, res, next) {
    if (req.error) {
        utils.writeJson(res, {status: req.error});
        return;
    }

    const body = req.swagger.params['body'].value;
    Records.setPersonalGraphic(req, body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.skipRecord = function skipRecord(req, res, next) {
    var body = req.swagger.params['body'].value;
    Records.skipRecord(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};
