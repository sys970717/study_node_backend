import randomstring from 'randomstring';

export default class CreateUniqueId {
  private readonly _TYPE_CODE = {
    GOODS: 'GOODS',
    SUPPLY: 'SUPPLY'
  }

  _getTypeCode() {
    return this._TYPE_CODE;
  }

  getRandomStringByType = (type) => {
    const randomStr = randomstring.generate(13);
    switch(type) {
      case this._TYPE_CODE.GOODS: 
        return `G${randomStr}`;
      case this._TYPE_CODE.SUPPLY: 
        return `S${randomStr}`;
    }
  }
}