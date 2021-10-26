import type { AWS } from "@serverless/typescript";

 
// import { getUser,saveUser,getAllUsers,updateUser,deleteUser} from "@functions/crudUser";
import getUsers from "@functions/findPets";
import addPet from "@functions/addPet";
import deletePet from "@functions/deletePet";
import findPetById from "@functions/findPetById";
 
// import {table_name} from "@libs/constants";
const serverlessConfiguration: AWS = {
  // service: "serverless-with-ts",
  service: "serverless-ahsan",
  frameworkVersion: "2",
  custom: {
    dynamodb: {
      stages: ["dev"],
      start: {
        port: 8000,
        inMemory: true,
        heapInitial: "200m",
        heapMax: "1g",
        migrate: true,
        seed: true,
        convertEmptyValues: true,
      },
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
    },
  },
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
     "serverless-dynamodb-local",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    lambdaHashingVersion: "20201221",
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["dynamodb:*"],
        Resource: "*",
      },
    ],
  },
  // import the function via paths
  functions: { getUsers,addPet,findPetById,deletePet },

  resources: {
    Resources: {
      usersTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "usersTable_pets_ahsan",
          AttributeDefinitions: [
            { AttributeName: "id", AttributeType: "N" },
          ],
          KeySchema: [
            { AttributeName: "id", KeyType: "HASH" },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
