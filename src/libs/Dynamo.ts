const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

const documentClient = new AWS.DynamoDB.DocumentClient({
  // region: "localhost",
  // endpoint: "http://localhost:8000",
});

export const Dynamo = {
  //  .............................................. find pet by id ................................................
  async findPetById(id, TableName) {
    const params = {
      TableName,
      Key: {
        id,
      },
    };
    const data = await documentClient.get(params).promise();

    return data.Item;
  },
  //  .............................................. delete pet ................................................
  async deletePet(id: number, TableName) {
    const params = {
      TableName,
      Key: {
        id,
      },
    };

    const res = await documentClient.delete(params).promise();

    if (!res) {
      throw Error(
        `There was an error deleting pet ${id} in table ${TableName}`
      );
    }

    return JSON.stringify("pet daleted successfully by id");
  },
  //  .............................................. find pets ................................................
  async findPets(Limit, Tags, TableName) {
    let params: any;

    if (Limit && !Tags) {
      params = {
        TableName,
        Limit: Limit,
      };
    } else if (!Limit && Tags) {
      params = {
        TableName,

        FilterExpression: "contains(#tag,:Tags)",
      
        ExpressionAttributeNames: {
          "#tag": "tag",
        },
        ExpressionAttributeValues: {
          ":Tags": Tags,
        },
      };
    } else {
      params = {
        TableName,
        Limit: Limit,
        FilterExpression: "contains(#tag,:Tags)",
  
        ExpressionAttributeNames: {
          "#tag": "tag",
        },
        ExpressionAttributeValues: {
          ":Tags": Tags,
        },
      };
    }

    console.log(Tags);

    const res = await documentClient.scan(params).promise();

    if (!res) {
      throw Error(` table ${TableName}` + " is not present");
    }

    return res;
  },
  //  .............................................. add pet ................................................
  async addPET(pet, TableName) {
    if (!pet.id || !pet.name) {
      throw Error("no ID, name, or tag on the data");
    }

    const params = {
      TableName,
      Item: pet,
    };

    const res = await documentClient.put(params).promise();

    if (!res) {
      throw Error(
        `There was an error inserting ID of ${pet.ID} and email ${pet.name} in table ${TableName}`
      );
    }

    return pet;
  },
};
