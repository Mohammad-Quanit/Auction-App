import AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export async function closeAuctions(auction) {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: { id: auction.id },
    UpdateExpression: 'set #status = :status',
    ExpressionAttributeValues: {
      ':status': 'CLOSED',
    },
    ExpressionAttributeNames: {
      '#status': 'status',
    }
  };

  const result = await dynamodb.update(params).promise();
  return result;
}