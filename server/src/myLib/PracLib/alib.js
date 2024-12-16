const mg = require("mongodb");
//const client = new mg.MongoClient('mongodb://localhost:27017/');
//const client = new mg.MongoClient('mongodb+srv://asdhod2003:y74TG8pBSxG09d82@blobercluster.8rovz.mongodb.net/');


class alib {
    constructor(database, connectionString) {
        this.db = database;
        this.client = new mg.MongoClient(connectionString);
        this.collection = {};
        this.collectionName = null;

        (async () => {
            await this.client.connect();
        })();


    }
    async find(query) {

        if (Object.keys(this.collection).length > 0) {
            try {
                let state = await this.collection[this.collectionName].find(query);
                state = await state.toArray();
                return state;
            } catch (error) {
                console.error('Error from alib.find method  :', error);
            }
        }
        else {

            throw new Error("set collection first");

        }
    }

    async ag(query) {
        if (Object.keys(this.collection).length > 0) {
            try {
                let state = this.collection[this.collectionName]
                    .aggregate(query);
                state = await state.toArray();
                return state;
            } catch (error) {
                console.error('Error from alib.ag method  :', error);
            }

        }
        else {

            throw new Error("set collection first");

        }
    }

    async insertOne(query) {
        if (Object.keys(this.collection).length > 0) {
            try {

                let state = await this.collection[this.collectionName]
                    .insertOne(query);

                return state;
            } catch (error) {
                console.error('Error from alib.insertOne method  :', error);
            }
        }
        else {

            throw new Error("set collection first");

        }


    }


    async updateOne(matching, update) {


        if (Object.keys(this.collection).length > 0) {
            try {

                let state = await this.collection[this.collectionName]
                    .updateOne(matching, update);

                return state;
            } catch (error) {
                console.error('Error from alib.updateOne method  :', error);
            }
        }
        else {

            throw new Error("set collection first");

        }
    }

    setCollection(str) {
        this.collection[str] = this.client.db(this.db).collection(str);
        this.collectionName = str;

    }

    async over() {
        try {

            await this.client.close();

        } catch (error) {
            console.error('Error from alib.over method  :', error);
        }
    }



}


module.exports = alib;

