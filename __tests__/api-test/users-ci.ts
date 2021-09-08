import app from '@/app';

import * as supertest from 'supertest';
import { DEFAULT_PAYLOAD, encodePayload } from '../tools/for_http';

import { Connection, createConnection } from "typeorm";
import { connectionOptions } from "@/config/databases/testDatabase";

let connection:Connection;

beforeAll(() => {
  createConnection(connectionOptions).then(async connection => {
    connection = connection;
    console.log(`DB connection = ${connection.isConnected}`);
  });
});

const request = supertest(app);

const endpoint = '/v1/users';
const headers = {
  'Content-Type': 'application/json',
  payload: encodePayload(DEFAULT_PAYLOAD)
};

describe('새로운 계정 생성하기.', () => {
  it('계정 생성', async () => {
    const 
  });
})