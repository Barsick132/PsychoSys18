module.exports.ROLE = {
    ADMIN: 'Admin',
    STUDENT: 'Student',
    PARENT: 'Parent',
    EMPLOYEE: 'Employee',
    TEACHER: 'Teacher',
    PSYCHOLOGIST: 'Psychologist'
};

module.exports.TABLES = {
    PEOPLE: {
        NAME: 'people',
        PEPL_ID: 'pepl_id',
        PEPL_LOGIN: 'pepl_login',
        PEPL_HASH_PASS: 'pepl_hash_pass',
        PEPL_SALT: 'pepl_salt',
        PEPL_SECOND_NAME: 'pepl_second_name',
        PEPL_FIRST_NAME: 'pepl_first_name',
        PEPL_LAST_NAME: 'pepl_last_name',
        PEPL_GENDER: 'pepl_gender',
        PEPL_BIRTHDAY: 'pepl_birthday',
        PEPL_PHONE: 'pepl_phone',
        PEPL_EMAIL: 'pepl_email'
    },
    EMPLOYEES: {
        NAME: 'employees',
        EMP_ID: 'emp_id',
        EMP_SKYPE: 'emp_skype',
        EMP_DISCORD: 'emp_discord',
        EMP_HANGOUTS: 'emp_hangouts',
        EMP_VIBER: 'emp_viber',
        EMP_VK: 'emp_vk',
        EMP_DATE_ENROLLMENT: 'emp_date_enrollment',
    },
    STUDENTS: {
        NAME: 'students',
        STD_ID: 'std_id',
        EMP_ID: 'emp_id',
        STD_DATE_RECEIPT: 'std_date_receipt',
        STD_STAYED_TWO_YEAR: 'std_stayed_two_year',
        STD_CLASS_LETTER: 'std_class_letter',
        STD_DATE_ISSUE: 'std_date_issue'
    },
    PARENTS: {
        NAME: 'parents',
        PRNT_ID: 'prnt_id',
        PRNT_CITY: 'prnt_city',
        PRNT_STREET: 'prnt_street',
        PRNT_HOME: 'prnt_home',
        PRNT_FLAT: 'prnt_flat',
        PRNT_CONFIRM: 'prnt_confirm'
    },
    CONFIRM_REG: {
        NAME: 'confirm_reg',
        CR_ID: 'cr_id',
        PRNT_ID: 'prnt_id',
        CR_SECOND_CHILD: 'cr_second_child',
        CR_FIRST_CHILD: 'cr_first_child',
        CR_LAST_CHILD: 'cr_last_child',
        CR_SECOND_TEACHER: 'cr_second_teacher',
        CR_FIRST_TEACHER: 'cr_first_teacher',
        CR_LAST_TEACHER: 'cr_last_teacher',
        CR_CLASS: 'cr_class'
    },
    ROLE: {
        NAME: 'role',
        PEPL_ID: 'pepl_id',
        ROLE_NAME: 'role_name'
    },
    POSTS: {
        NAME: 'posts',
        PST_ID: 'pst_id',
        PST_NAME: 'pst_name',
        PST_DESCRIPTION: 'pst_description'
    },
    FILE: 'file',
    RECORDS: {
        NAME: 'records',
        REC_ID: 'rec_id',
        PEPL_ID: 'pepl_id',
        WD_ID: 'wd_id',
        REC_TIME: 'rec_time',
        REC_ONLINE: 'rec_online',
        REC_NOT_COME: 'rec_not_come',
        CONT_NAME: 'cont_name',
        CONT_VALUE: 'cont_value'
    },
    VISITS: 'visits',
    TESTS: 'tests',
    AVAILABLE_TESTS: 'available_tests',
    TEST_RESULTS: 'test_results',
    WORKING_DAYS: {
        NAME: 'working_days',
        WD_ID: 'wd_id',
        EMP_ID: 'emp_id',
        WD_DATE: 'wd_date',
        WD_TIME_BEGIN: 'wd_time_begin',
        WD_TIME_END: 'wd_time_end',
        WD_BREAK_BEGIN: 'wd_break_begin',
        WD_BREAK_END: 'wd_break_end',
        WD_DURATION: 'wd_duration'
    },
    MENTAL_MAP: 'mental_map',
    EMP_PST: {
        NAME: 'emp/pst',
        EMP_ID: 'emp_id',
        PST_ID: 'pst_id'
    },
    STD_PRNT: {
        NAME: 'std/prnt',
        STD_ID: 'std_id',
        PRNT_ID: 'prnt_id'
    }
};