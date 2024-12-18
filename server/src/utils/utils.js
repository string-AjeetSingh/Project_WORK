const alib = require('./../myLib/PracLib/alib');
const isDebugging = require('./../myLib/ifDebugging/ifDebugging');
const debug = new isDebugging(process.env.IS_DEBUGGING);

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

module.exports.setPrevNo = async (collection) => {

    debug.console('from the setPrevNo  -- -- --');
    let mongo = new alib("Work", process.env.MONGOSTRING);
    mongo.setCollection(collection);

    let result = await mongo.find({ 'Document': 'val' });
    if (result.length > 0) {
        let updateVal = null;
        debug.console('found val , must contain prevNo ', result);

        if (result[0].prevNo === null) {
            updateVal = 1;

        } else if (result[0].prevNo) {
            updateVal = result[0].prevNo + 1;

        }
        debug.console("the updated no is ", updateVal);
        result = await mongo.updateOne({ "Document": 'val' },
            { $set: { 'prevNo': updateVal } });
        debug.console('the prevNo must be updated the status : ', result);
        if (result.modifiedCount) {

            debug.console('update succesfully');
            return updateVal;
        }
        debug.console('prevNo is unable to update');
        return false;
    }
    else {
        debug.console('not found prevNo');
        return false;
    }

};