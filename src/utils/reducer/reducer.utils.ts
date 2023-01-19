import { AnyAction } from "redux";

//matchable type

//AC- action creator

type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>["type"];
  match(action: AnyAction): action is ReturnType<AC>;
};

//withMatcher type

//without arguments(type overloading)
export function withMatcher<AC extends () => AnyAction & { type: string }>(
  actionCreator: AC
): Matchable<AC>;

//with arguments(type overloading)
export function withMatcher<
  AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;


//withMatcher implementation
export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    }
  })
}

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}

//type predicate functions

// type Alien = {
//   fly: () => {};
// }

// type Human = {
//   speak: () => {};
// }

// function isHuman(entity: Alien | Human): entity is Human (type predicate function) {
//   return (entity as Human).speak !== undefined;
// }

// const Josh

// if(isHuman(Josh)) {
//   Josh.speak();
// }

//Itersection type

// type Human ={
//   name: string;
// }

// type Alien = {
//   fly: () => {};
// }

// type Hybrid = Human & Alien;

// const Josh: Hybrid = {
//   name: "Josh",
//   fly: () => {}
// }

//Return type

// type Human = {
//   name: string;
// }

// type MyFunc = () => Human;

// type MyReturn = ReturnType<MyFunc>;
