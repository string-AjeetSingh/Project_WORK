module.exports.jsonParseIfString = (val) => {
    console.log('from jsonParseIfString() Util');
    console.log('type of : ', typeof val);
    if (typeof val == 'string') {
        let result;
        console.log('provided val is string', val);
        result = JSON.parse(val);
        return result;
    }
    else {
        console.log('no modifications');
        return val;
    }
}