
type Payload = {
  sub: string,
  name: string,
  iat: number,
  service_name: string,
  id: string,
  group: string | string[],
};

export const DEFAULT_PAYLOAD: Payload = {
  sub: "1234567890",
  name: "sys",
  iat: new Date().getTime()/1000,
  service_name: '',
  id: 'qqqq',
  group: ['default'],
};

export const encodePayload = (value = DEFAULT_PAYLOAD) => `application/json;base64,${Buffer.from(JSON.stringify(value), 'utf8').toString('base64')}`;