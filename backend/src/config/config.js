exports.server = {
    port: 8080,
    noTokenUrl: [
        '/account/signup',
        '/account/login',
        '/estate/getCount',
        '/estate/getInformation',
        '/estate/getList'
    ],
    expTime: 60 * 60 * 24,
    secret: 'NPT'
}

exports.database = {
    host: 'localhost',
    user: 'postgres',
    password: '161026',
    database: 'mypt',
    port: "5432"
}

exports.constant = {
    upload_path: "uploads/",
    web3storage_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEFBNzA4ODVGNDFBZTFDNTg1MTc4MjgzZTdjOGNmODUyOWU2RWJhOWIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTU2MDk5NTMyOTgsIm5hbWUiOiJNWVBUIn0.8xSAOB_PWljGPULRS8ZaPchKgwykVxzyBgdPJGSpRSE"
}
