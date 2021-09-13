// Entity 기본 인터페이스 선언.
export interface IEntity {
  id: number,
  createAt: Date,
  updateAt: Date,
};

// 추상클래스 선언.
export abstract class Entity<T extends IEntity> {
  private readonly _id: number | undefined;
  private _properties: T;

  protected constructor(props: T) {
    this._id = props.id;
    this._properties = props;
  }

  get id(): number {
    return this._id;
  }

  protected get properties(): T {
    return this._properties;
  }

  protected set properties(props: T) {
    props.id = this._id;
    props.createAt = this._properties.createAt;
    this._properties = props;
  }

  get props(): T {
    return this.properties;
  }

  set props(props: T) {
    this.properties = props;
  }

  equals (object?: Entity<T>) : boolean {
    if (object == null || object == undefined) {
      return false;
    }
    
    if (this === object) {
      return true;
    }
    
    if (!isEntity(object)) {
      return false;
    }
  
    return String(this._id) === String(object._id);
  }
}

const isEntity = (entity: any): entity is Entity<any> => {
  return entity instanceof Entity;
};
