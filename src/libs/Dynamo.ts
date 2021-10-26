const AWS = require("aws-sdk");
// AWS.config.update({ region: "us-east-1" });

const documentClient = new AWS.DynamoDB.DocumentClient({
  region: "localhost",
  endpoint: "http://localhost:8000",
});

export const Dynamo = {
  //  .............................................. find pet by id ................................................
  /**
   *  @description findPetById is used to get pet by its id
   *  @param   {id} is the pet id which we retrived from pathParameters
   *  @param   {TableName:sting} is the name of the table in which we are storing the pet data
   *  @return  the item i.e the pet which is stored in the table
   **/
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
  /**
   *  @description deletePet is used to get pet by its id
   *  @param   {id:number} is the pet id which we retrived from pathParameters
   *  @param   {TableName:string} is the name of the table in which we are storing the pet data
   *  @return   success string if pet is deleted successfully else error string
   **/
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
  /**
   *  @description findPets is used to get pet by its id
   *  @param   {Limit:number} is the limit i.e number of records that we want
   *                             to get => retrived from querystringParemeters
   *  @param   {Tags:string} are the tags which we ill match using the dynamo filter
   *                             expressions  => retrived from querystringParemeters
   *  @param   {TableName:string} is the name of the table in which we are storing the pet data
   *  @return   array of the pets with the filter or without filter
   **/
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
    } else if (!Limit && !Tags) {
      params = {
        TableName,
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

    const res = await documentClient.scan(params).promise();

    if (!res) {
      throw Error(` table ${TableName}` + " is not present");
    }

    return res;
  },
  //  .............................................. add pet ................................................
  /**
   *  @description findPets is used to get pet by its id
   *  @param   {pet:object} is the object which contins the tag of the pet and its name
   *  @return   the added pet which is currently saved in the dynamo table
   **/

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
