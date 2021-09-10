import app from '@/app';
import ctx from '@/app-context';
import supertest from 'supertest';
import { DEFAULT_PAYLOAD, encodePayload } from '../tools/for_http';

import UserSignUpDto from '@/domains/dto/UserSignUpDto';
import UserLoginDto from '@/domains/dto/UserLoginDto';

const request = supertest(app);

const endpoint = '/v1/users/sign-up';
const headers = {
  'Content-Type': 'application/json',
  payload: encodePayload(DEFAULT_PAYLOAD)
};

describe('새로운 계정 생성/로그인.', () => {
  test('계정 생성', async () => {
    const body = UserSignUpDto.ofForRequestTrans('test1', 'test1_password', 1);
    const users = await ctx.usersService.createUsers(body);
    expect(users instanceof UserSignUpDto).toBeTruthy();

    const signInBody = UserLoginDto.ofForSignIn('test1', 'test1_password');
    const loginUser = await ctx.usersService.login(signInBody);
    expect(users instanceof UserLoginDto).toBeTruthy();
  });

  test('계정 중복생성 실패 테스트', async() => {
    const body = UserSignUpDto.ofForRequestTrans('test1', 'test1_password', 1);
    const users = await ctx.usersService.createUsers(body);
    expect(await ctx.usersService.createUsers(body)).toBe('이미 있는 회원입니다.');
  })

  test('테스트 계정 삭제', async() => {
    await ctx.usersService.removeByName('test1');
  })
});
