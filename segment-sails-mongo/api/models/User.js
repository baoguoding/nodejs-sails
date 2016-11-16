module.exports = {
    tableName: 'user',
    adapter: 'sails-mongo',
    autoCreatedAt: false,
    autoUpdatedAt: false,
    attributes: {
        id:{columnName: '_id'},email:{},pwd:{},nicheng:{},updtime:{},createtime:{}
    }
};