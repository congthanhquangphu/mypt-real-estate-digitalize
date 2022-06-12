exports.server = {
    port: 8080,
    noTokenUrl: [
        '/account/signup', 
        '/account/login', 
        '/estate/getCount', 
        'estate/getInformation', 
        '/estate/getList'
    ],
    expTime: 60 * 60 * 24,
    secret: 'NPT'
}

exports.database = {
    host: 'localhost',
    user: 'postgres',
    password: '161026',
    database: 'npt',
    port: "5432"
}

exports.constant = {
}
