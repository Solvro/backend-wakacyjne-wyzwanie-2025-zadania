
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model trip
 * 
 */
export type trip = $Result.DefaultSelection<Prisma.$tripPayload>
/**
 * Model participant
 * 
 */
export type participant = $Result.DefaultSelection<Prisma.$participantPayload>
/**
 * Model trip_participant
 * 
 */
export type trip_participant = $Result.DefaultSelection<Prisma.$trip_participantPayload>
/**
 * Model expense
 * 
 */
export type expense = $Result.DefaultSelection<Prisma.$expensePayload>
/**
 * Model participant_expense
 * 
 */
export type participant_expense = $Result.DefaultSelection<Prisma.$participant_expensePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const TripStatus: {
  PLANNED: 'PLANNED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED'
};

export type TripStatus = (typeof TripStatus)[keyof typeof TripStatus]

}

export type TripStatus = $Enums.TripStatus

export const TripStatus: typeof $Enums.TripStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Trips
 * const trips = await prisma.trip.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Trips
   * const trips = await prisma.trip.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.trip`: Exposes CRUD operations for the **trip** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Trips
    * const trips = await prisma.trip.findMany()
    * ```
    */
  get trip(): Prisma.tripDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.participant`: Exposes CRUD operations for the **participant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Participants
    * const participants = await prisma.participant.findMany()
    * ```
    */
  get participant(): Prisma.participantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trip_participant`: Exposes CRUD operations for the **trip_participant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Trip_participants
    * const trip_participants = await prisma.trip_participant.findMany()
    * ```
    */
  get trip_participant(): Prisma.trip_participantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.expense`: Exposes CRUD operations for the **expense** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Expenses
    * const expenses = await prisma.expense.findMany()
    * ```
    */
  get expense(): Prisma.expenseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.participant_expense`: Exposes CRUD operations for the **participant_expense** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Participant_expenses
    * const participant_expenses = await prisma.participant_expense.findMany()
    * ```
    */
  get participant_expense(): Prisma.participant_expenseDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.14.0
   * Query Engine version: 717184b7b35ea05dfa71a3236b7af656013e1e49
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    trip: 'trip',
    participant: 'participant',
    trip_participant: 'trip_participant',
    expense: 'expense',
    participant_expense: 'participant_expense'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "trip" | "participant" | "trip_participant" | "expense" | "participant_expense"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      trip: {
        payload: Prisma.$tripPayload<ExtArgs>
        fields: Prisma.tripFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tripFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tripPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tripFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tripPayload>
          }
          findFirst: {
            args: Prisma.tripFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tripPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tripFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tripPayload>
          }
          findMany: {
            args: Prisma.tripFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tripPayload>[]
          }
          create: {
            args: Prisma.tripCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tripPayload>
          }
          createMany: {
            args: Prisma.tripCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.tripCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tripPayload>[]
          }
          delete: {
            args: Prisma.tripDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tripPayload>
          }
          update: {
            args: Prisma.tripUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tripPayload>
          }
          deleteMany: {
            args: Prisma.tripDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tripUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.tripUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tripPayload>[]
          }
          upsert: {
            args: Prisma.tripUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tripPayload>
          }
          aggregate: {
            args: Prisma.TripAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrip>
          }
          groupBy: {
            args: Prisma.tripGroupByArgs<ExtArgs>
            result: $Utils.Optional<TripGroupByOutputType>[]
          }
          count: {
            args: Prisma.tripCountArgs<ExtArgs>
            result: $Utils.Optional<TripCountAggregateOutputType> | number
          }
        }
      }
      participant: {
        payload: Prisma.$participantPayload<ExtArgs>
        fields: Prisma.participantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.participantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.participantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participantPayload>
          }
          findFirst: {
            args: Prisma.participantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.participantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participantPayload>
          }
          findMany: {
            args: Prisma.participantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participantPayload>[]
          }
          create: {
            args: Prisma.participantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participantPayload>
          }
          createMany: {
            args: Prisma.participantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.participantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participantPayload>[]
          }
          delete: {
            args: Prisma.participantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participantPayload>
          }
          update: {
            args: Prisma.participantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participantPayload>
          }
          deleteMany: {
            args: Prisma.participantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.participantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.participantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participantPayload>[]
          }
          upsert: {
            args: Prisma.participantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participantPayload>
          }
          aggregate: {
            args: Prisma.ParticipantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateParticipant>
          }
          groupBy: {
            args: Prisma.participantGroupByArgs<ExtArgs>
            result: $Utils.Optional<ParticipantGroupByOutputType>[]
          }
          count: {
            args: Prisma.participantCountArgs<ExtArgs>
            result: $Utils.Optional<ParticipantCountAggregateOutputType> | number
          }
        }
      }
      trip_participant: {
        payload: Prisma.$trip_participantPayload<ExtArgs>
        fields: Prisma.trip_participantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.trip_participantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$trip_participantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.trip_participantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$trip_participantPayload>
          }
          findFirst: {
            args: Prisma.trip_participantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$trip_participantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.trip_participantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$trip_participantPayload>
          }
          findMany: {
            args: Prisma.trip_participantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$trip_participantPayload>[]
          }
          create: {
            args: Prisma.trip_participantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$trip_participantPayload>
          }
          createMany: {
            args: Prisma.trip_participantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.trip_participantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$trip_participantPayload>[]
          }
          delete: {
            args: Prisma.trip_participantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$trip_participantPayload>
          }
          update: {
            args: Prisma.trip_participantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$trip_participantPayload>
          }
          deleteMany: {
            args: Prisma.trip_participantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.trip_participantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.trip_participantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$trip_participantPayload>[]
          }
          upsert: {
            args: Prisma.trip_participantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$trip_participantPayload>
          }
          aggregate: {
            args: Prisma.Trip_participantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrip_participant>
          }
          groupBy: {
            args: Prisma.trip_participantGroupByArgs<ExtArgs>
            result: $Utils.Optional<Trip_participantGroupByOutputType>[]
          }
          count: {
            args: Prisma.trip_participantCountArgs<ExtArgs>
            result: $Utils.Optional<Trip_participantCountAggregateOutputType> | number
          }
        }
      }
      expense: {
        payload: Prisma.$expensePayload<ExtArgs>
        fields: Prisma.expenseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.expenseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expensePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.expenseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expensePayload>
          }
          findFirst: {
            args: Prisma.expenseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expensePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.expenseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expensePayload>
          }
          findMany: {
            args: Prisma.expenseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expensePayload>[]
          }
          create: {
            args: Prisma.expenseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expensePayload>
          }
          createMany: {
            args: Prisma.expenseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.expenseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expensePayload>[]
          }
          delete: {
            args: Prisma.expenseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expensePayload>
          }
          update: {
            args: Prisma.expenseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expensePayload>
          }
          deleteMany: {
            args: Prisma.expenseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.expenseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.expenseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expensePayload>[]
          }
          upsert: {
            args: Prisma.expenseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expensePayload>
          }
          aggregate: {
            args: Prisma.ExpenseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExpense>
          }
          groupBy: {
            args: Prisma.expenseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExpenseGroupByOutputType>[]
          }
          count: {
            args: Prisma.expenseCountArgs<ExtArgs>
            result: $Utils.Optional<ExpenseCountAggregateOutputType> | number
          }
        }
      }
      participant_expense: {
        payload: Prisma.$participant_expensePayload<ExtArgs>
        fields: Prisma.participant_expenseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.participant_expenseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participant_expensePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.participant_expenseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participant_expensePayload>
          }
          findFirst: {
            args: Prisma.participant_expenseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participant_expensePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.participant_expenseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participant_expensePayload>
          }
          findMany: {
            args: Prisma.participant_expenseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participant_expensePayload>[]
          }
          create: {
            args: Prisma.participant_expenseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participant_expensePayload>
          }
          createMany: {
            args: Prisma.participant_expenseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.participant_expenseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participant_expensePayload>[]
          }
          delete: {
            args: Prisma.participant_expenseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participant_expensePayload>
          }
          update: {
            args: Prisma.participant_expenseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participant_expensePayload>
          }
          deleteMany: {
            args: Prisma.participant_expenseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.participant_expenseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.participant_expenseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participant_expensePayload>[]
          }
          upsert: {
            args: Prisma.participant_expenseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participant_expensePayload>
          }
          aggregate: {
            args: Prisma.Participant_expenseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateParticipant_expense>
          }
          groupBy: {
            args: Prisma.participant_expenseGroupByArgs<ExtArgs>
            result: $Utils.Optional<Participant_expenseGroupByOutputType>[]
          }
          count: {
            args: Prisma.participant_expenseCountArgs<ExtArgs>
            result: $Utils.Optional<Participant_expenseCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    trip?: tripOmit
    participant?: participantOmit
    trip_participant?: trip_participantOmit
    expense?: expenseOmit
    participant_expense?: participant_expenseOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type TripCountOutputType
   */

  export type TripCountOutputType = {
    participants: number
    expenses: number
  }

  export type TripCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participants?: boolean | TripCountOutputTypeCountParticipantsArgs
    expenses?: boolean | TripCountOutputTypeCountExpensesArgs
  }

  // Custom InputTypes
  /**
   * TripCountOutputType without action
   */
  export type TripCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripCountOutputType
     */
    select?: TripCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TripCountOutputType without action
   */
  export type TripCountOutputTypeCountParticipantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: trip_participantWhereInput
  }

  /**
   * TripCountOutputType without action
   */
  export type TripCountOutputTypeCountExpensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: expenseWhereInput
  }


  /**
   * Count Type ParticipantCountOutputType
   */

  export type ParticipantCountOutputType = {
    trips: number
    participant_expences: number
  }

  export type ParticipantCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trips?: boolean | ParticipantCountOutputTypeCountTripsArgs
    participant_expences?: boolean | ParticipantCountOutputTypeCountParticipant_expencesArgs
  }

  // Custom InputTypes
  /**
   * ParticipantCountOutputType without action
   */
  export type ParticipantCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantCountOutputType
     */
    select?: ParticipantCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ParticipantCountOutputType without action
   */
  export type ParticipantCountOutputTypeCountTripsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: trip_participantWhereInput
  }

  /**
   * ParticipantCountOutputType without action
   */
  export type ParticipantCountOutputTypeCountParticipant_expencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: participant_expenseWhereInput
  }


  /**
   * Count Type ExpenseCountOutputType
   */

  export type ExpenseCountOutputType = {
    participant_expences: number
  }

  export type ExpenseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participant_expences?: boolean | ExpenseCountOutputTypeCountParticipant_expencesArgs
  }

  // Custom InputTypes
  /**
   * ExpenseCountOutputType without action
   */
  export type ExpenseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCountOutputType
     */
    select?: ExpenseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ExpenseCountOutputType without action
   */
  export type ExpenseCountOutputTypeCountParticipant_expencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: participant_expenseWhereInput
  }


  /**
   * Models
   */

  /**
   * Model trip
   */

  export type AggregateTrip = {
    _count: TripCountAggregateOutputType | null
    _avg: TripAvgAggregateOutputType | null
    _sum: TripSumAggregateOutputType | null
    _min: TripMinAggregateOutputType | null
    _max: TripMaxAggregateOutputType | null
  }

  export type TripAvgAggregateOutputType = {
    trip_id: number | null
  }

  export type TripSumAggregateOutputType = {
    trip_id: number | null
  }

  export type TripMinAggregateOutputType = {
    trip_id: number | null
    name: string | null
    start: Date | null
    end: Date | null
    status: $Enums.TripStatus | null
  }

  export type TripMaxAggregateOutputType = {
    trip_id: number | null
    name: string | null
    start: Date | null
    end: Date | null
    status: $Enums.TripStatus | null
  }

  export type TripCountAggregateOutputType = {
    trip_id: number
    name: number
    start: number
    end: number
    status: number
    _all: number
  }


  export type TripAvgAggregateInputType = {
    trip_id?: true
  }

  export type TripSumAggregateInputType = {
    trip_id?: true
  }

  export type TripMinAggregateInputType = {
    trip_id?: true
    name?: true
    start?: true
    end?: true
    status?: true
  }

  export type TripMaxAggregateInputType = {
    trip_id?: true
    name?: true
    start?: true
    end?: true
    status?: true
  }

  export type TripCountAggregateInputType = {
    trip_id?: true
    name?: true
    start?: true
    end?: true
    status?: true
    _all?: true
  }

  export type TripAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which trip to aggregate.
     */
    where?: tripWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of trips to fetch.
     */
    orderBy?: tripOrderByWithRelationInput | tripOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tripWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` trips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` trips.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned trips
    **/
    _count?: true | TripCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TripAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TripSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TripMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TripMaxAggregateInputType
  }

  export type GetTripAggregateType<T extends TripAggregateArgs> = {
        [P in keyof T & keyof AggregateTrip]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrip[P]>
      : GetScalarType<T[P], AggregateTrip[P]>
  }




  export type tripGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tripWhereInput
    orderBy?: tripOrderByWithAggregationInput | tripOrderByWithAggregationInput[]
    by: TripScalarFieldEnum[] | TripScalarFieldEnum
    having?: tripScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TripCountAggregateInputType | true
    _avg?: TripAvgAggregateInputType
    _sum?: TripSumAggregateInputType
    _min?: TripMinAggregateInputType
    _max?: TripMaxAggregateInputType
  }

  export type TripGroupByOutputType = {
    trip_id: number
    name: string
    start: Date
    end: Date
    status: $Enums.TripStatus
    _count: TripCountAggregateOutputType | null
    _avg: TripAvgAggregateOutputType | null
    _sum: TripSumAggregateOutputType | null
    _min: TripMinAggregateOutputType | null
    _max: TripMaxAggregateOutputType | null
  }

  type GetTripGroupByPayload<T extends tripGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TripGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TripGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TripGroupByOutputType[P]>
            : GetScalarType<T[P], TripGroupByOutputType[P]>
        }
      >
    >


  export type tripSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    trip_id?: boolean
    name?: boolean
    start?: boolean
    end?: boolean
    status?: boolean
    participants?: boolean | trip$participantsArgs<ExtArgs>
    expenses?: boolean | trip$expensesArgs<ExtArgs>
    _count?: boolean | TripCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trip"]>

  export type tripSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    trip_id?: boolean
    name?: boolean
    start?: boolean
    end?: boolean
    status?: boolean
  }, ExtArgs["result"]["trip"]>

  export type tripSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    trip_id?: boolean
    name?: boolean
    start?: boolean
    end?: boolean
    status?: boolean
  }, ExtArgs["result"]["trip"]>

  export type tripSelectScalar = {
    trip_id?: boolean
    name?: boolean
    start?: boolean
    end?: boolean
    status?: boolean
  }

  export type tripOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"trip_id" | "name" | "start" | "end" | "status", ExtArgs["result"]["trip"]>
  export type tripInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participants?: boolean | trip$participantsArgs<ExtArgs>
    expenses?: boolean | trip$expensesArgs<ExtArgs>
    _count?: boolean | TripCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type tripIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type tripIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $tripPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "trip"
    objects: {
      participants: Prisma.$trip_participantPayload<ExtArgs>[]
      expenses: Prisma.$expensePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      trip_id: number
      name: string
      start: Date
      end: Date
      status: $Enums.TripStatus
    }, ExtArgs["result"]["trip"]>
    composites: {}
  }

  type tripGetPayload<S extends boolean | null | undefined | tripDefaultArgs> = $Result.GetResult<Prisma.$tripPayload, S>

  type tripCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tripFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TripCountAggregateInputType | true
    }

  export interface tripDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['trip'], meta: { name: 'trip' } }
    /**
     * Find zero or one Trip that matches the filter.
     * @param {tripFindUniqueArgs} args - Arguments to find a Trip
     * @example
     * // Get one Trip
     * const trip = await prisma.trip.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tripFindUniqueArgs>(args: SelectSubset<T, tripFindUniqueArgs<ExtArgs>>): Prisma__tripClient<$Result.GetResult<Prisma.$tripPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Trip that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tripFindUniqueOrThrowArgs} args - Arguments to find a Trip
     * @example
     * // Get one Trip
     * const trip = await prisma.trip.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tripFindUniqueOrThrowArgs>(args: SelectSubset<T, tripFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tripClient<$Result.GetResult<Prisma.$tripPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trip that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tripFindFirstArgs} args - Arguments to find a Trip
     * @example
     * // Get one Trip
     * const trip = await prisma.trip.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tripFindFirstArgs>(args?: SelectSubset<T, tripFindFirstArgs<ExtArgs>>): Prisma__tripClient<$Result.GetResult<Prisma.$tripPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trip that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tripFindFirstOrThrowArgs} args - Arguments to find a Trip
     * @example
     * // Get one Trip
     * const trip = await prisma.trip.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tripFindFirstOrThrowArgs>(args?: SelectSubset<T, tripFindFirstOrThrowArgs<ExtArgs>>): Prisma__tripClient<$Result.GetResult<Prisma.$tripPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Trips that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tripFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Trips
     * const trips = await prisma.trip.findMany()
     * 
     * // Get first 10 Trips
     * const trips = await prisma.trip.findMany({ take: 10 })
     * 
     * // Only select the `trip_id`
     * const tripWithTrip_idOnly = await prisma.trip.findMany({ select: { trip_id: true } })
     * 
     */
    findMany<T extends tripFindManyArgs>(args?: SelectSubset<T, tripFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tripPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Trip.
     * @param {tripCreateArgs} args - Arguments to create a Trip.
     * @example
     * // Create one Trip
     * const Trip = await prisma.trip.create({
     *   data: {
     *     // ... data to create a Trip
     *   }
     * })
     * 
     */
    create<T extends tripCreateArgs>(args: SelectSubset<T, tripCreateArgs<ExtArgs>>): Prisma__tripClient<$Result.GetResult<Prisma.$tripPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Trips.
     * @param {tripCreateManyArgs} args - Arguments to create many Trips.
     * @example
     * // Create many Trips
     * const trip = await prisma.trip.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tripCreateManyArgs>(args?: SelectSubset<T, tripCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Trips and returns the data saved in the database.
     * @param {tripCreateManyAndReturnArgs} args - Arguments to create many Trips.
     * @example
     * // Create many Trips
     * const trip = await prisma.trip.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Trips and only return the `trip_id`
     * const tripWithTrip_idOnly = await prisma.trip.createManyAndReturn({
     *   select: { trip_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends tripCreateManyAndReturnArgs>(args?: SelectSubset<T, tripCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tripPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Trip.
     * @param {tripDeleteArgs} args - Arguments to delete one Trip.
     * @example
     * // Delete one Trip
     * const Trip = await prisma.trip.delete({
     *   where: {
     *     // ... filter to delete one Trip
     *   }
     * })
     * 
     */
    delete<T extends tripDeleteArgs>(args: SelectSubset<T, tripDeleteArgs<ExtArgs>>): Prisma__tripClient<$Result.GetResult<Prisma.$tripPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Trip.
     * @param {tripUpdateArgs} args - Arguments to update one Trip.
     * @example
     * // Update one Trip
     * const trip = await prisma.trip.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tripUpdateArgs>(args: SelectSubset<T, tripUpdateArgs<ExtArgs>>): Prisma__tripClient<$Result.GetResult<Prisma.$tripPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Trips.
     * @param {tripDeleteManyArgs} args - Arguments to filter Trips to delete.
     * @example
     * // Delete a few Trips
     * const { count } = await prisma.trip.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tripDeleteManyArgs>(args?: SelectSubset<T, tripDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trips.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tripUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Trips
     * const trip = await prisma.trip.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tripUpdateManyArgs>(args: SelectSubset<T, tripUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trips and returns the data updated in the database.
     * @param {tripUpdateManyAndReturnArgs} args - Arguments to update many Trips.
     * @example
     * // Update many Trips
     * const trip = await prisma.trip.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Trips and only return the `trip_id`
     * const tripWithTrip_idOnly = await prisma.trip.updateManyAndReturn({
     *   select: { trip_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends tripUpdateManyAndReturnArgs>(args: SelectSubset<T, tripUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tripPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Trip.
     * @param {tripUpsertArgs} args - Arguments to update or create a Trip.
     * @example
     * // Update or create a Trip
     * const trip = await prisma.trip.upsert({
     *   create: {
     *     // ... data to create a Trip
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Trip we want to update
     *   }
     * })
     */
    upsert<T extends tripUpsertArgs>(args: SelectSubset<T, tripUpsertArgs<ExtArgs>>): Prisma__tripClient<$Result.GetResult<Prisma.$tripPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Trips.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tripCountArgs} args - Arguments to filter Trips to count.
     * @example
     * // Count the number of Trips
     * const count = await prisma.trip.count({
     *   where: {
     *     // ... the filter for the Trips we want to count
     *   }
     * })
    **/
    count<T extends tripCountArgs>(
      args?: Subset<T, tripCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TripCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Trip.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TripAggregateArgs>(args: Subset<T, TripAggregateArgs>): Prisma.PrismaPromise<GetTripAggregateType<T>>

    /**
     * Group by Trip.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tripGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends tripGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tripGroupByArgs['orderBy'] }
        : { orderBy?: tripGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, tripGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTripGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the trip model
   */
  readonly fields: tripFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for trip.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tripClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    participants<T extends trip$participantsArgs<ExtArgs> = {}>(args?: Subset<T, trip$participantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$trip_participantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    expenses<T extends trip$expensesArgs<ExtArgs> = {}>(args?: Subset<T, trip$expensesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$expensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the trip model
   */
  interface tripFieldRefs {
    readonly trip_id: FieldRef<"trip", 'Int'>
    readonly name: FieldRef<"trip", 'String'>
    readonly start: FieldRef<"trip", 'DateTime'>
    readonly end: FieldRef<"trip", 'DateTime'>
    readonly status: FieldRef<"trip", 'TripStatus'>
  }
    

  // Custom InputTypes
  /**
   * trip findUnique
   */
  export type tripFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trip
     */
    select?: tripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trip
     */
    omit?: tripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tripInclude<ExtArgs> | null
    /**
     * Filter, which trip to fetch.
     */
    where: tripWhereUniqueInput
  }

  /**
   * trip findUniqueOrThrow
   */
  export type tripFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trip
     */
    select?: tripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trip
     */
    omit?: tripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tripInclude<ExtArgs> | null
    /**
     * Filter, which trip to fetch.
     */
    where: tripWhereUniqueInput
  }

  /**
   * trip findFirst
   */
  export type tripFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trip
     */
    select?: tripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trip
     */
    omit?: tripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tripInclude<ExtArgs> | null
    /**
     * Filter, which trip to fetch.
     */
    where?: tripWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of trips to fetch.
     */
    orderBy?: tripOrderByWithRelationInput | tripOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for trips.
     */
    cursor?: tripWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` trips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` trips.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of trips.
     */
    distinct?: TripScalarFieldEnum | TripScalarFieldEnum[]
  }

  /**
   * trip findFirstOrThrow
   */
  export type tripFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trip
     */
    select?: tripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trip
     */
    omit?: tripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tripInclude<ExtArgs> | null
    /**
     * Filter, which trip to fetch.
     */
    where?: tripWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of trips to fetch.
     */
    orderBy?: tripOrderByWithRelationInput | tripOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for trips.
     */
    cursor?: tripWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` trips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` trips.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of trips.
     */
    distinct?: TripScalarFieldEnum | TripScalarFieldEnum[]
  }

  /**
   * trip findMany
   */
  export type tripFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trip
     */
    select?: tripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trip
     */
    omit?: tripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tripInclude<ExtArgs> | null
    /**
     * Filter, which trips to fetch.
     */
    where?: tripWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of trips to fetch.
     */
    orderBy?: tripOrderByWithRelationInput | tripOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing trips.
     */
    cursor?: tripWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` trips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` trips.
     */
    skip?: number
    distinct?: TripScalarFieldEnum | TripScalarFieldEnum[]
  }

  /**
   * trip create
   */
  export type tripCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trip
     */
    select?: tripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trip
     */
    omit?: tripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tripInclude<ExtArgs> | null
    /**
     * The data needed to create a trip.
     */
    data: XOR<tripCreateInput, tripUncheckedCreateInput>
  }

  /**
   * trip createMany
   */
  export type tripCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many trips.
     */
    data: tripCreateManyInput | tripCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * trip createManyAndReturn
   */
  export type tripCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trip
     */
    select?: tripSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the trip
     */
    omit?: tripOmit<ExtArgs> | null
    /**
     * The data used to create many trips.
     */
    data: tripCreateManyInput | tripCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * trip update
   */
  export type tripUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trip
     */
    select?: tripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trip
     */
    omit?: tripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tripInclude<ExtArgs> | null
    /**
     * The data needed to update a trip.
     */
    data: XOR<tripUpdateInput, tripUncheckedUpdateInput>
    /**
     * Choose, which trip to update.
     */
    where: tripWhereUniqueInput
  }

  /**
   * trip updateMany
   */
  export type tripUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update trips.
     */
    data: XOR<tripUpdateManyMutationInput, tripUncheckedUpdateManyInput>
    /**
     * Filter which trips to update
     */
    where?: tripWhereInput
    /**
     * Limit how many trips to update.
     */
    limit?: number
  }

  /**
   * trip updateManyAndReturn
   */
  export type tripUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trip
     */
    select?: tripSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the trip
     */
    omit?: tripOmit<ExtArgs> | null
    /**
     * The data used to update trips.
     */
    data: XOR<tripUpdateManyMutationInput, tripUncheckedUpdateManyInput>
    /**
     * Filter which trips to update
     */
    where?: tripWhereInput
    /**
     * Limit how many trips to update.
     */
    limit?: number
  }

  /**
   * trip upsert
   */
  export type tripUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trip
     */
    select?: tripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trip
     */
    omit?: tripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tripInclude<ExtArgs> | null
    /**
     * The filter to search for the trip to update in case it exists.
     */
    where: tripWhereUniqueInput
    /**
     * In case the trip found by the `where` argument doesn't exist, create a new trip with this data.
     */
    create: XOR<tripCreateInput, tripUncheckedCreateInput>
    /**
     * In case the trip was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tripUpdateInput, tripUncheckedUpdateInput>
  }

  /**
   * trip delete
   */
  export type tripDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trip
     */
    select?: tripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trip
     */
    omit?: tripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tripInclude<ExtArgs> | null
    /**
     * Filter which trip to delete.
     */
    where: tripWhereUniqueInput
  }

  /**
   * trip deleteMany
   */
  export type tripDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which trips to delete
     */
    where?: tripWhereInput
    /**
     * Limit how many trips to delete.
     */
    limit?: number
  }

  /**
   * trip.participants
   */
  export type trip$participantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trip_participant
     */
    select?: trip_participantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trip_participant
     */
    omit?: trip_participantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: trip_participantInclude<ExtArgs> | null
    where?: trip_participantWhereInput
    orderBy?: trip_participantOrderByWithRelationInput | trip_participantOrderByWithRelationInput[]
    cursor?: trip_participantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Trip_participantScalarFieldEnum | Trip_participantScalarFieldEnum[]
  }

  /**
   * trip.expenses
   */
  export type trip$expensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expense
     */
    select?: expenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expense
     */
    omit?: expenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expenseInclude<ExtArgs> | null
    where?: expenseWhereInput
    orderBy?: expenseOrderByWithRelationInput | expenseOrderByWithRelationInput[]
    cursor?: expenseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * trip without action
   */
  export type tripDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trip
     */
    select?: tripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trip
     */
    omit?: tripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tripInclude<ExtArgs> | null
  }


  /**
   * Model participant
   */

  export type AggregateParticipant = {
    _count: ParticipantCountAggregateOutputType | null
    _avg: ParticipantAvgAggregateOutputType | null
    _sum: ParticipantSumAggregateOutputType | null
    _min: ParticipantMinAggregateOutputType | null
    _max: ParticipantMaxAggregateOutputType | null
  }

  export type ParticipantAvgAggregateOutputType = {
    participant_id: number | null
  }

  export type ParticipantSumAggregateOutputType = {
    participant_id: number | null
  }

  export type ParticipantMinAggregateOutputType = {
    participant_id: number | null
    name: string | null
    email: string | null
  }

  export type ParticipantMaxAggregateOutputType = {
    participant_id: number | null
    name: string | null
    email: string | null
  }

  export type ParticipantCountAggregateOutputType = {
    participant_id: number
    name: number
    email: number
    _all: number
  }


  export type ParticipantAvgAggregateInputType = {
    participant_id?: true
  }

  export type ParticipantSumAggregateInputType = {
    participant_id?: true
  }

  export type ParticipantMinAggregateInputType = {
    participant_id?: true
    name?: true
    email?: true
  }

  export type ParticipantMaxAggregateInputType = {
    participant_id?: true
    name?: true
    email?: true
  }

  export type ParticipantCountAggregateInputType = {
    participant_id?: true
    name?: true
    email?: true
    _all?: true
  }

  export type ParticipantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which participant to aggregate.
     */
    where?: participantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of participants to fetch.
     */
    orderBy?: participantOrderByWithRelationInput | participantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: participantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` participants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned participants
    **/
    _count?: true | ParticipantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ParticipantAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ParticipantSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ParticipantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ParticipantMaxAggregateInputType
  }

  export type GetParticipantAggregateType<T extends ParticipantAggregateArgs> = {
        [P in keyof T & keyof AggregateParticipant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateParticipant[P]>
      : GetScalarType<T[P], AggregateParticipant[P]>
  }




  export type participantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: participantWhereInput
    orderBy?: participantOrderByWithAggregationInput | participantOrderByWithAggregationInput[]
    by: ParticipantScalarFieldEnum[] | ParticipantScalarFieldEnum
    having?: participantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ParticipantCountAggregateInputType | true
    _avg?: ParticipantAvgAggregateInputType
    _sum?: ParticipantSumAggregateInputType
    _min?: ParticipantMinAggregateInputType
    _max?: ParticipantMaxAggregateInputType
  }

  export type ParticipantGroupByOutputType = {
    participant_id: number
    name: string
    email: string
    _count: ParticipantCountAggregateOutputType | null
    _avg: ParticipantAvgAggregateOutputType | null
    _sum: ParticipantSumAggregateOutputType | null
    _min: ParticipantMinAggregateOutputType | null
    _max: ParticipantMaxAggregateOutputType | null
  }

  type GetParticipantGroupByPayload<T extends participantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ParticipantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ParticipantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ParticipantGroupByOutputType[P]>
            : GetScalarType<T[P], ParticipantGroupByOutputType[P]>
        }
      >
    >


  export type participantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    participant_id?: boolean
    name?: boolean
    email?: boolean
    trips?: boolean | participant$tripsArgs<ExtArgs>
    participant_expences?: boolean | participant$participant_expencesArgs<ExtArgs>
    _count?: boolean | ParticipantCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["participant"]>

  export type participantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    participant_id?: boolean
    name?: boolean
    email?: boolean
  }, ExtArgs["result"]["participant"]>

  export type participantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    participant_id?: boolean
    name?: boolean
    email?: boolean
  }, ExtArgs["result"]["participant"]>

  export type participantSelectScalar = {
    participant_id?: boolean
    name?: boolean
    email?: boolean
  }

  export type participantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"participant_id" | "name" | "email", ExtArgs["result"]["participant"]>
  export type participantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trips?: boolean | participant$tripsArgs<ExtArgs>
    participant_expences?: boolean | participant$participant_expencesArgs<ExtArgs>
    _count?: boolean | ParticipantCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type participantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type participantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $participantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "participant"
    objects: {
      trips: Prisma.$trip_participantPayload<ExtArgs>[]
      participant_expences: Prisma.$participant_expensePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      participant_id: number
      name: string
      email: string
    }, ExtArgs["result"]["participant"]>
    composites: {}
  }

  type participantGetPayload<S extends boolean | null | undefined | participantDefaultArgs> = $Result.GetResult<Prisma.$participantPayload, S>

  type participantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<participantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ParticipantCountAggregateInputType | true
    }

  export interface participantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['participant'], meta: { name: 'participant' } }
    /**
     * Find zero or one Participant that matches the filter.
     * @param {participantFindUniqueArgs} args - Arguments to find a Participant
     * @example
     * // Get one Participant
     * const participant = await prisma.participant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends participantFindUniqueArgs>(args: SelectSubset<T, participantFindUniqueArgs<ExtArgs>>): Prisma__participantClient<$Result.GetResult<Prisma.$participantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Participant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {participantFindUniqueOrThrowArgs} args - Arguments to find a Participant
     * @example
     * // Get one Participant
     * const participant = await prisma.participant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends participantFindUniqueOrThrowArgs>(args: SelectSubset<T, participantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__participantClient<$Result.GetResult<Prisma.$participantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Participant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {participantFindFirstArgs} args - Arguments to find a Participant
     * @example
     * // Get one Participant
     * const participant = await prisma.participant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends participantFindFirstArgs>(args?: SelectSubset<T, participantFindFirstArgs<ExtArgs>>): Prisma__participantClient<$Result.GetResult<Prisma.$participantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Participant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {participantFindFirstOrThrowArgs} args - Arguments to find a Participant
     * @example
     * // Get one Participant
     * const participant = await prisma.participant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends participantFindFirstOrThrowArgs>(args?: SelectSubset<T, participantFindFirstOrThrowArgs<ExtArgs>>): Prisma__participantClient<$Result.GetResult<Prisma.$participantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Participants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {participantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Participants
     * const participants = await prisma.participant.findMany()
     * 
     * // Get first 10 Participants
     * const participants = await prisma.participant.findMany({ take: 10 })
     * 
     * // Only select the `participant_id`
     * const participantWithParticipant_idOnly = await prisma.participant.findMany({ select: { participant_id: true } })
     * 
     */
    findMany<T extends participantFindManyArgs>(args?: SelectSubset<T, participantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$participantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Participant.
     * @param {participantCreateArgs} args - Arguments to create a Participant.
     * @example
     * // Create one Participant
     * const Participant = await prisma.participant.create({
     *   data: {
     *     // ... data to create a Participant
     *   }
     * })
     * 
     */
    create<T extends participantCreateArgs>(args: SelectSubset<T, participantCreateArgs<ExtArgs>>): Prisma__participantClient<$Result.GetResult<Prisma.$participantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Participants.
     * @param {participantCreateManyArgs} args - Arguments to create many Participants.
     * @example
     * // Create many Participants
     * const participant = await prisma.participant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends participantCreateManyArgs>(args?: SelectSubset<T, participantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Participants and returns the data saved in the database.
     * @param {participantCreateManyAndReturnArgs} args - Arguments to create many Participants.
     * @example
     * // Create many Participants
     * const participant = await prisma.participant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Participants and only return the `participant_id`
     * const participantWithParticipant_idOnly = await prisma.participant.createManyAndReturn({
     *   select: { participant_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends participantCreateManyAndReturnArgs>(args?: SelectSubset<T, participantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$participantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Participant.
     * @param {participantDeleteArgs} args - Arguments to delete one Participant.
     * @example
     * // Delete one Participant
     * const Participant = await prisma.participant.delete({
     *   where: {
     *     // ... filter to delete one Participant
     *   }
     * })
     * 
     */
    delete<T extends participantDeleteArgs>(args: SelectSubset<T, participantDeleteArgs<ExtArgs>>): Prisma__participantClient<$Result.GetResult<Prisma.$participantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Participant.
     * @param {participantUpdateArgs} args - Arguments to update one Participant.
     * @example
     * // Update one Participant
     * const participant = await prisma.participant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends participantUpdateArgs>(args: SelectSubset<T, participantUpdateArgs<ExtArgs>>): Prisma__participantClient<$Result.GetResult<Prisma.$participantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Participants.
     * @param {participantDeleteManyArgs} args - Arguments to filter Participants to delete.
     * @example
     * // Delete a few Participants
     * const { count } = await prisma.participant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends participantDeleteManyArgs>(args?: SelectSubset<T, participantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Participants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {participantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Participants
     * const participant = await prisma.participant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends participantUpdateManyArgs>(args: SelectSubset<T, participantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Participants and returns the data updated in the database.
     * @param {participantUpdateManyAndReturnArgs} args - Arguments to update many Participants.
     * @example
     * // Update many Participants
     * const participant = await prisma.participant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Participants and only return the `participant_id`
     * const participantWithParticipant_idOnly = await prisma.participant.updateManyAndReturn({
     *   select: { participant_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends participantUpdateManyAndReturnArgs>(args: SelectSubset<T, participantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$participantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Participant.
     * @param {participantUpsertArgs} args - Arguments to update or create a Participant.
     * @example
     * // Update or create a Participant
     * const participant = await prisma.participant.upsert({
     *   create: {
     *     // ... data to create a Participant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Participant we want to update
     *   }
     * })
     */
    upsert<T extends participantUpsertArgs>(args: SelectSubset<T, participantUpsertArgs<ExtArgs>>): Prisma__participantClient<$Result.GetResult<Prisma.$participantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Participants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {participantCountArgs} args - Arguments to filter Participants to count.
     * @example
     * // Count the number of Participants
     * const count = await prisma.participant.count({
     *   where: {
     *     // ... the filter for the Participants we want to count
     *   }
     * })
    **/
    count<T extends participantCountArgs>(
      args?: Subset<T, participantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ParticipantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Participant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ParticipantAggregateArgs>(args: Subset<T, ParticipantAggregateArgs>): Prisma.PrismaPromise<GetParticipantAggregateType<T>>

    /**
     * Group by Participant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {participantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends participantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: participantGroupByArgs['orderBy'] }
        : { orderBy?: participantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, participantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParticipantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the participant model
   */
  readonly fields: participantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for participant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__participantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trips<T extends participant$tripsArgs<ExtArgs> = {}>(args?: Subset<T, participant$tripsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$trip_participantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    participant_expences<T extends participant$participant_expencesArgs<ExtArgs> = {}>(args?: Subset<T, participant$participant_expencesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$participant_expensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the participant model
   */
  interface participantFieldRefs {
    readonly participant_id: FieldRef<"participant", 'Int'>
    readonly name: FieldRef<"participant", 'String'>
    readonly email: FieldRef<"participant", 'String'>
  }
    

  // Custom InputTypes
  /**
   * participant findUnique
   */
  export type participantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant
     */
    select?: participantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant
     */
    omit?: participantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participantInclude<ExtArgs> | null
    /**
     * Filter, which participant to fetch.
     */
    where: participantWhereUniqueInput
  }

  /**
   * participant findUniqueOrThrow
   */
  export type participantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant
     */
    select?: participantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant
     */
    omit?: participantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participantInclude<ExtArgs> | null
    /**
     * Filter, which participant to fetch.
     */
    where: participantWhereUniqueInput
  }

  /**
   * participant findFirst
   */
  export type participantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant
     */
    select?: participantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant
     */
    omit?: participantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participantInclude<ExtArgs> | null
    /**
     * Filter, which participant to fetch.
     */
    where?: participantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of participants to fetch.
     */
    orderBy?: participantOrderByWithRelationInput | participantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for participants.
     */
    cursor?: participantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` participants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of participants.
     */
    distinct?: ParticipantScalarFieldEnum | ParticipantScalarFieldEnum[]
  }

  /**
   * participant findFirstOrThrow
   */
  export type participantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant
     */
    select?: participantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant
     */
    omit?: participantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participantInclude<ExtArgs> | null
    /**
     * Filter, which participant to fetch.
     */
    where?: participantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of participants to fetch.
     */
    orderBy?: participantOrderByWithRelationInput | participantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for participants.
     */
    cursor?: participantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` participants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of participants.
     */
    distinct?: ParticipantScalarFieldEnum | ParticipantScalarFieldEnum[]
  }

  /**
   * participant findMany
   */
  export type participantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant
     */
    select?: participantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant
     */
    omit?: participantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participantInclude<ExtArgs> | null
    /**
     * Filter, which participants to fetch.
     */
    where?: participantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of participants to fetch.
     */
    orderBy?: participantOrderByWithRelationInput | participantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing participants.
     */
    cursor?: participantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` participants.
     */
    skip?: number
    distinct?: ParticipantScalarFieldEnum | ParticipantScalarFieldEnum[]
  }

  /**
   * participant create
   */
  export type participantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant
     */
    select?: participantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant
     */
    omit?: participantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participantInclude<ExtArgs> | null
    /**
     * The data needed to create a participant.
     */
    data: XOR<participantCreateInput, participantUncheckedCreateInput>
  }

  /**
   * participant createMany
   */
  export type participantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many participants.
     */
    data: participantCreateManyInput | participantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * participant createManyAndReturn
   */
  export type participantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant
     */
    select?: participantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the participant
     */
    omit?: participantOmit<ExtArgs> | null
    /**
     * The data used to create many participants.
     */
    data: participantCreateManyInput | participantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * participant update
   */
  export type participantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant
     */
    select?: participantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant
     */
    omit?: participantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participantInclude<ExtArgs> | null
    /**
     * The data needed to update a participant.
     */
    data: XOR<participantUpdateInput, participantUncheckedUpdateInput>
    /**
     * Choose, which participant to update.
     */
    where: participantWhereUniqueInput
  }

  /**
   * participant updateMany
   */
  export type participantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update participants.
     */
    data: XOR<participantUpdateManyMutationInput, participantUncheckedUpdateManyInput>
    /**
     * Filter which participants to update
     */
    where?: participantWhereInput
    /**
     * Limit how many participants to update.
     */
    limit?: number
  }

  /**
   * participant updateManyAndReturn
   */
  export type participantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant
     */
    select?: participantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the participant
     */
    omit?: participantOmit<ExtArgs> | null
    /**
     * The data used to update participants.
     */
    data: XOR<participantUpdateManyMutationInput, participantUncheckedUpdateManyInput>
    /**
     * Filter which participants to update
     */
    where?: participantWhereInput
    /**
     * Limit how many participants to update.
     */
    limit?: number
  }

  /**
   * participant upsert
   */
  export type participantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant
     */
    select?: participantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant
     */
    omit?: participantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participantInclude<ExtArgs> | null
    /**
     * The filter to search for the participant to update in case it exists.
     */
    where: participantWhereUniqueInput
    /**
     * In case the participant found by the `where` argument doesn't exist, create a new participant with this data.
     */
    create: XOR<participantCreateInput, participantUncheckedCreateInput>
    /**
     * In case the participant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<participantUpdateInput, participantUncheckedUpdateInput>
  }

  /**
   * participant delete
   */
  export type participantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant
     */
    select?: participantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant
     */
    omit?: participantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participantInclude<ExtArgs> | null
    /**
     * Filter which participant to delete.
     */
    where: participantWhereUniqueInput
  }

  /**
   * participant deleteMany
   */
  export type participantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which participants to delete
     */
    where?: participantWhereInput
    /**
     * Limit how many participants to delete.
     */
    limit?: number
  }

  /**
   * participant.trips
   */
  export type participant$tripsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trip_participant
     */
    select?: trip_participantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trip_participant
     */
    omit?: trip_participantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: trip_participantInclude<ExtArgs> | null
    where?: trip_participantWhereInput
    orderBy?: trip_participantOrderByWithRelationInput | trip_participantOrderByWithRelationInput[]
    cursor?: trip_participantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Trip_participantScalarFieldEnum | Trip_participantScalarFieldEnum[]
  }

  /**
   * participant.participant_expences
   */
  export type participant$participant_expencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant_expense
     */
    select?: participant_expenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant_expense
     */
    omit?: participant_expenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participant_expenseInclude<ExtArgs> | null
    where?: participant_expenseWhereInput
    orderBy?: participant_expenseOrderByWithRelationInput | participant_expenseOrderByWithRelationInput[]
    cursor?: participant_expenseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Participant_expenseScalarFieldEnum | Participant_expenseScalarFieldEnum[]
  }

  /**
   * participant without action
   */
  export type participantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant
     */
    select?: participantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant
     */
    omit?: participantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participantInclude<ExtArgs> | null
  }


  /**
   * Model trip_participant
   */

  export type AggregateTrip_participant = {
    _count: Trip_participantCountAggregateOutputType | null
    _avg: Trip_participantAvgAggregateOutputType | null
    _sum: Trip_participantSumAggregateOutputType | null
    _min: Trip_participantMinAggregateOutputType | null
    _max: Trip_participantMaxAggregateOutputType | null
  }

  export type Trip_participantAvgAggregateOutputType = {
    trip_id: number | null
    participant_id: number | null
  }

  export type Trip_participantSumAggregateOutputType = {
    trip_id: number | null
    participant_id: number | null
  }

  export type Trip_participantMinAggregateOutputType = {
    trip_id: number | null
    participant_id: number | null
  }

  export type Trip_participantMaxAggregateOutputType = {
    trip_id: number | null
    participant_id: number | null
  }

  export type Trip_participantCountAggregateOutputType = {
    trip_id: number
    participant_id: number
    _all: number
  }


  export type Trip_participantAvgAggregateInputType = {
    trip_id?: true
    participant_id?: true
  }

  export type Trip_participantSumAggregateInputType = {
    trip_id?: true
    participant_id?: true
  }

  export type Trip_participantMinAggregateInputType = {
    trip_id?: true
    participant_id?: true
  }

  export type Trip_participantMaxAggregateInputType = {
    trip_id?: true
    participant_id?: true
  }

  export type Trip_participantCountAggregateInputType = {
    trip_id?: true
    participant_id?: true
    _all?: true
  }

  export type Trip_participantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which trip_participant to aggregate.
     */
    where?: trip_participantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of trip_participants to fetch.
     */
    orderBy?: trip_participantOrderByWithRelationInput | trip_participantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: trip_participantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` trip_participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` trip_participants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned trip_participants
    **/
    _count?: true | Trip_participantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Trip_participantAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Trip_participantSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Trip_participantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Trip_participantMaxAggregateInputType
  }

  export type GetTrip_participantAggregateType<T extends Trip_participantAggregateArgs> = {
        [P in keyof T & keyof AggregateTrip_participant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrip_participant[P]>
      : GetScalarType<T[P], AggregateTrip_participant[P]>
  }




  export type trip_participantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: trip_participantWhereInput
    orderBy?: trip_participantOrderByWithAggregationInput | trip_participantOrderByWithAggregationInput[]
    by: Trip_participantScalarFieldEnum[] | Trip_participantScalarFieldEnum
    having?: trip_participantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Trip_participantCountAggregateInputType | true
    _avg?: Trip_participantAvgAggregateInputType
    _sum?: Trip_participantSumAggregateInputType
    _min?: Trip_participantMinAggregateInputType
    _max?: Trip_participantMaxAggregateInputType
  }

  export type Trip_participantGroupByOutputType = {
    trip_id: number
    participant_id: number
    _count: Trip_participantCountAggregateOutputType | null
    _avg: Trip_participantAvgAggregateOutputType | null
    _sum: Trip_participantSumAggregateOutputType | null
    _min: Trip_participantMinAggregateOutputType | null
    _max: Trip_participantMaxAggregateOutputType | null
  }

  type GetTrip_participantGroupByPayload<T extends trip_participantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Trip_participantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Trip_participantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Trip_participantGroupByOutputType[P]>
            : GetScalarType<T[P], Trip_participantGroupByOutputType[P]>
        }
      >
    >


  export type trip_participantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    trip_id?: boolean
    participant_id?: boolean
    trip?: boolean | tripDefaultArgs<ExtArgs>
    participant?: boolean | participantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trip_participant"]>

  export type trip_participantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    trip_id?: boolean
    participant_id?: boolean
    trip?: boolean | tripDefaultArgs<ExtArgs>
    participant?: boolean | participantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trip_participant"]>

  export type trip_participantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    trip_id?: boolean
    participant_id?: boolean
    trip?: boolean | tripDefaultArgs<ExtArgs>
    participant?: boolean | participantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trip_participant"]>

  export type trip_participantSelectScalar = {
    trip_id?: boolean
    participant_id?: boolean
  }

  export type trip_participantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"trip_id" | "participant_id", ExtArgs["result"]["trip_participant"]>
  export type trip_participantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trip?: boolean | tripDefaultArgs<ExtArgs>
    participant?: boolean | participantDefaultArgs<ExtArgs>
  }
  export type trip_participantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trip?: boolean | tripDefaultArgs<ExtArgs>
    participant?: boolean | participantDefaultArgs<ExtArgs>
  }
  export type trip_participantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trip?: boolean | tripDefaultArgs<ExtArgs>
    participant?: boolean | participantDefaultArgs<ExtArgs>
  }

  export type $trip_participantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "trip_participant"
    objects: {
      trip: Prisma.$tripPayload<ExtArgs>
      participant: Prisma.$participantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      trip_id: number
      participant_id: number
    }, ExtArgs["result"]["trip_participant"]>
    composites: {}
  }

  type trip_participantGetPayload<S extends boolean | null | undefined | trip_participantDefaultArgs> = $Result.GetResult<Prisma.$trip_participantPayload, S>

  type trip_participantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<trip_participantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Trip_participantCountAggregateInputType | true
    }

  export interface trip_participantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['trip_participant'], meta: { name: 'trip_participant' } }
    /**
     * Find zero or one Trip_participant that matches the filter.
     * @param {trip_participantFindUniqueArgs} args - Arguments to find a Trip_participant
     * @example
     * // Get one Trip_participant
     * const trip_participant = await prisma.trip_participant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends trip_participantFindUniqueArgs>(args: SelectSubset<T, trip_participantFindUniqueArgs<ExtArgs>>): Prisma__trip_participantClient<$Result.GetResult<Prisma.$trip_participantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Trip_participant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {trip_participantFindUniqueOrThrowArgs} args - Arguments to find a Trip_participant
     * @example
     * // Get one Trip_participant
     * const trip_participant = await prisma.trip_participant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends trip_participantFindUniqueOrThrowArgs>(args: SelectSubset<T, trip_participantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__trip_participantClient<$Result.GetResult<Prisma.$trip_participantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trip_participant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {trip_participantFindFirstArgs} args - Arguments to find a Trip_participant
     * @example
     * // Get one Trip_participant
     * const trip_participant = await prisma.trip_participant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends trip_participantFindFirstArgs>(args?: SelectSubset<T, trip_participantFindFirstArgs<ExtArgs>>): Prisma__trip_participantClient<$Result.GetResult<Prisma.$trip_participantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trip_participant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {trip_participantFindFirstOrThrowArgs} args - Arguments to find a Trip_participant
     * @example
     * // Get one Trip_participant
     * const trip_participant = await prisma.trip_participant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends trip_participantFindFirstOrThrowArgs>(args?: SelectSubset<T, trip_participantFindFirstOrThrowArgs<ExtArgs>>): Prisma__trip_participantClient<$Result.GetResult<Prisma.$trip_participantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Trip_participants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {trip_participantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Trip_participants
     * const trip_participants = await prisma.trip_participant.findMany()
     * 
     * // Get first 10 Trip_participants
     * const trip_participants = await prisma.trip_participant.findMany({ take: 10 })
     * 
     * // Only select the `trip_id`
     * const trip_participantWithTrip_idOnly = await prisma.trip_participant.findMany({ select: { trip_id: true } })
     * 
     */
    findMany<T extends trip_participantFindManyArgs>(args?: SelectSubset<T, trip_participantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$trip_participantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Trip_participant.
     * @param {trip_participantCreateArgs} args - Arguments to create a Trip_participant.
     * @example
     * // Create one Trip_participant
     * const Trip_participant = await prisma.trip_participant.create({
     *   data: {
     *     // ... data to create a Trip_participant
     *   }
     * })
     * 
     */
    create<T extends trip_participantCreateArgs>(args: SelectSubset<T, trip_participantCreateArgs<ExtArgs>>): Prisma__trip_participantClient<$Result.GetResult<Prisma.$trip_participantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Trip_participants.
     * @param {trip_participantCreateManyArgs} args - Arguments to create many Trip_participants.
     * @example
     * // Create many Trip_participants
     * const trip_participant = await prisma.trip_participant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends trip_participantCreateManyArgs>(args?: SelectSubset<T, trip_participantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Trip_participants and returns the data saved in the database.
     * @param {trip_participantCreateManyAndReturnArgs} args - Arguments to create many Trip_participants.
     * @example
     * // Create many Trip_participants
     * const trip_participant = await prisma.trip_participant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Trip_participants and only return the `trip_id`
     * const trip_participantWithTrip_idOnly = await prisma.trip_participant.createManyAndReturn({
     *   select: { trip_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends trip_participantCreateManyAndReturnArgs>(args?: SelectSubset<T, trip_participantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$trip_participantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Trip_participant.
     * @param {trip_participantDeleteArgs} args - Arguments to delete one Trip_participant.
     * @example
     * // Delete one Trip_participant
     * const Trip_participant = await prisma.trip_participant.delete({
     *   where: {
     *     // ... filter to delete one Trip_participant
     *   }
     * })
     * 
     */
    delete<T extends trip_participantDeleteArgs>(args: SelectSubset<T, trip_participantDeleteArgs<ExtArgs>>): Prisma__trip_participantClient<$Result.GetResult<Prisma.$trip_participantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Trip_participant.
     * @param {trip_participantUpdateArgs} args - Arguments to update one Trip_participant.
     * @example
     * // Update one Trip_participant
     * const trip_participant = await prisma.trip_participant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends trip_participantUpdateArgs>(args: SelectSubset<T, trip_participantUpdateArgs<ExtArgs>>): Prisma__trip_participantClient<$Result.GetResult<Prisma.$trip_participantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Trip_participants.
     * @param {trip_participantDeleteManyArgs} args - Arguments to filter Trip_participants to delete.
     * @example
     * // Delete a few Trip_participants
     * const { count } = await prisma.trip_participant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends trip_participantDeleteManyArgs>(args?: SelectSubset<T, trip_participantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trip_participants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {trip_participantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Trip_participants
     * const trip_participant = await prisma.trip_participant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends trip_participantUpdateManyArgs>(args: SelectSubset<T, trip_participantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trip_participants and returns the data updated in the database.
     * @param {trip_participantUpdateManyAndReturnArgs} args - Arguments to update many Trip_participants.
     * @example
     * // Update many Trip_participants
     * const trip_participant = await prisma.trip_participant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Trip_participants and only return the `trip_id`
     * const trip_participantWithTrip_idOnly = await prisma.trip_participant.updateManyAndReturn({
     *   select: { trip_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends trip_participantUpdateManyAndReturnArgs>(args: SelectSubset<T, trip_participantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$trip_participantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Trip_participant.
     * @param {trip_participantUpsertArgs} args - Arguments to update or create a Trip_participant.
     * @example
     * // Update or create a Trip_participant
     * const trip_participant = await prisma.trip_participant.upsert({
     *   create: {
     *     // ... data to create a Trip_participant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Trip_participant we want to update
     *   }
     * })
     */
    upsert<T extends trip_participantUpsertArgs>(args: SelectSubset<T, trip_participantUpsertArgs<ExtArgs>>): Prisma__trip_participantClient<$Result.GetResult<Prisma.$trip_participantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Trip_participants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {trip_participantCountArgs} args - Arguments to filter Trip_participants to count.
     * @example
     * // Count the number of Trip_participants
     * const count = await prisma.trip_participant.count({
     *   where: {
     *     // ... the filter for the Trip_participants we want to count
     *   }
     * })
    **/
    count<T extends trip_participantCountArgs>(
      args?: Subset<T, trip_participantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Trip_participantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Trip_participant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Trip_participantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Trip_participantAggregateArgs>(args: Subset<T, Trip_participantAggregateArgs>): Prisma.PrismaPromise<GetTrip_participantAggregateType<T>>

    /**
     * Group by Trip_participant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {trip_participantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends trip_participantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: trip_participantGroupByArgs['orderBy'] }
        : { orderBy?: trip_participantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, trip_participantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrip_participantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the trip_participant model
   */
  readonly fields: trip_participantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for trip_participant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__trip_participantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trip<T extends tripDefaultArgs<ExtArgs> = {}>(args?: Subset<T, tripDefaultArgs<ExtArgs>>): Prisma__tripClient<$Result.GetResult<Prisma.$tripPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    participant<T extends participantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, participantDefaultArgs<ExtArgs>>): Prisma__participantClient<$Result.GetResult<Prisma.$participantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the trip_participant model
   */
  interface trip_participantFieldRefs {
    readonly trip_id: FieldRef<"trip_participant", 'Int'>
    readonly participant_id: FieldRef<"trip_participant", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * trip_participant findUnique
   */
  export type trip_participantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trip_participant
     */
    select?: trip_participantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trip_participant
     */
    omit?: trip_participantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: trip_participantInclude<ExtArgs> | null
    /**
     * Filter, which trip_participant to fetch.
     */
    where: trip_participantWhereUniqueInput
  }

  /**
   * trip_participant findUniqueOrThrow
   */
  export type trip_participantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trip_participant
     */
    select?: trip_participantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trip_participant
     */
    omit?: trip_participantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: trip_participantInclude<ExtArgs> | null
    /**
     * Filter, which trip_participant to fetch.
     */
    where: trip_participantWhereUniqueInput
  }

  /**
   * trip_participant findFirst
   */
  export type trip_participantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trip_participant
     */
    select?: trip_participantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trip_participant
     */
    omit?: trip_participantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: trip_participantInclude<ExtArgs> | null
    /**
     * Filter, which trip_participant to fetch.
     */
    where?: trip_participantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of trip_participants to fetch.
     */
    orderBy?: trip_participantOrderByWithRelationInput | trip_participantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for trip_participants.
     */
    cursor?: trip_participantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` trip_participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` trip_participants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of trip_participants.
     */
    distinct?: Trip_participantScalarFieldEnum | Trip_participantScalarFieldEnum[]
  }

  /**
   * trip_participant findFirstOrThrow
   */
  export type trip_participantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trip_participant
     */
    select?: trip_participantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trip_participant
     */
    omit?: trip_participantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: trip_participantInclude<ExtArgs> | null
    /**
     * Filter, which trip_participant to fetch.
     */
    where?: trip_participantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of trip_participants to fetch.
     */
    orderBy?: trip_participantOrderByWithRelationInput | trip_participantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for trip_participants.
     */
    cursor?: trip_participantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` trip_participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` trip_participants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of trip_participants.
     */
    distinct?: Trip_participantScalarFieldEnum | Trip_participantScalarFieldEnum[]
  }

  /**
   * trip_participant findMany
   */
  export type trip_participantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trip_participant
     */
    select?: trip_participantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trip_participant
     */
    omit?: trip_participantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: trip_participantInclude<ExtArgs> | null
    /**
     * Filter, which trip_participants to fetch.
     */
    where?: trip_participantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of trip_participants to fetch.
     */
    orderBy?: trip_participantOrderByWithRelationInput | trip_participantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing trip_participants.
     */
    cursor?: trip_participantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` trip_participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` trip_participants.
     */
    skip?: number
    distinct?: Trip_participantScalarFieldEnum | Trip_participantScalarFieldEnum[]
  }

  /**
   * trip_participant create
   */
  export type trip_participantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trip_participant
     */
    select?: trip_participantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trip_participant
     */
    omit?: trip_participantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: trip_participantInclude<ExtArgs> | null
    /**
     * The data needed to create a trip_participant.
     */
    data: XOR<trip_participantCreateInput, trip_participantUncheckedCreateInput>
  }

  /**
   * trip_participant createMany
   */
  export type trip_participantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many trip_participants.
     */
    data: trip_participantCreateManyInput | trip_participantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * trip_participant createManyAndReturn
   */
  export type trip_participantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trip_participant
     */
    select?: trip_participantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the trip_participant
     */
    omit?: trip_participantOmit<ExtArgs> | null
    /**
     * The data used to create many trip_participants.
     */
    data: trip_participantCreateManyInput | trip_participantCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: trip_participantIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * trip_participant update
   */
  export type trip_participantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trip_participant
     */
    select?: trip_participantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trip_participant
     */
    omit?: trip_participantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: trip_participantInclude<ExtArgs> | null
    /**
     * The data needed to update a trip_participant.
     */
    data: XOR<trip_participantUpdateInput, trip_participantUncheckedUpdateInput>
    /**
     * Choose, which trip_participant to update.
     */
    where: trip_participantWhereUniqueInput
  }

  /**
   * trip_participant updateMany
   */
  export type trip_participantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update trip_participants.
     */
    data: XOR<trip_participantUpdateManyMutationInput, trip_participantUncheckedUpdateManyInput>
    /**
     * Filter which trip_participants to update
     */
    where?: trip_participantWhereInput
    /**
     * Limit how many trip_participants to update.
     */
    limit?: number
  }

  /**
   * trip_participant updateManyAndReturn
   */
  export type trip_participantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trip_participant
     */
    select?: trip_participantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the trip_participant
     */
    omit?: trip_participantOmit<ExtArgs> | null
    /**
     * The data used to update trip_participants.
     */
    data: XOR<trip_participantUpdateManyMutationInput, trip_participantUncheckedUpdateManyInput>
    /**
     * Filter which trip_participants to update
     */
    where?: trip_participantWhereInput
    /**
     * Limit how many trip_participants to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: trip_participantIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * trip_participant upsert
   */
  export type trip_participantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trip_participant
     */
    select?: trip_participantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trip_participant
     */
    omit?: trip_participantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: trip_participantInclude<ExtArgs> | null
    /**
     * The filter to search for the trip_participant to update in case it exists.
     */
    where: trip_participantWhereUniqueInput
    /**
     * In case the trip_participant found by the `where` argument doesn't exist, create a new trip_participant with this data.
     */
    create: XOR<trip_participantCreateInput, trip_participantUncheckedCreateInput>
    /**
     * In case the trip_participant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<trip_participantUpdateInput, trip_participantUncheckedUpdateInput>
  }

  /**
   * trip_participant delete
   */
  export type trip_participantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trip_participant
     */
    select?: trip_participantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trip_participant
     */
    omit?: trip_participantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: trip_participantInclude<ExtArgs> | null
    /**
     * Filter which trip_participant to delete.
     */
    where: trip_participantWhereUniqueInput
  }

  /**
   * trip_participant deleteMany
   */
  export type trip_participantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which trip_participants to delete
     */
    where?: trip_participantWhereInput
    /**
     * Limit how many trip_participants to delete.
     */
    limit?: number
  }

  /**
   * trip_participant without action
   */
  export type trip_participantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trip_participant
     */
    select?: trip_participantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trip_participant
     */
    omit?: trip_participantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: trip_participantInclude<ExtArgs> | null
  }


  /**
   * Model expense
   */

  export type AggregateExpense = {
    _count: ExpenseCountAggregateOutputType | null
    _avg: ExpenseAvgAggregateOutputType | null
    _sum: ExpenseSumAggregateOutputType | null
    _min: ExpenseMinAggregateOutputType | null
    _max: ExpenseMaxAggregateOutputType | null
  }

  export type ExpenseAvgAggregateOutputType = {
    expense_id: number | null
    trip_id: number | null
    sum: number | null
  }

  export type ExpenseSumAggregateOutputType = {
    expense_id: number | null
    trip_id: number | null
    sum: number | null
  }

  export type ExpenseMinAggregateOutputType = {
    expense_id: number | null
    name: string | null
    trip_id: number | null
    sum: number | null
    is_settled: boolean | null
  }

  export type ExpenseMaxAggregateOutputType = {
    expense_id: number | null
    name: string | null
    trip_id: number | null
    sum: number | null
    is_settled: boolean | null
  }

  export type ExpenseCountAggregateOutputType = {
    expense_id: number
    name: number
    trip_id: number
    sum: number
    is_settled: number
    _all: number
  }


  export type ExpenseAvgAggregateInputType = {
    expense_id?: true
    trip_id?: true
    sum?: true
  }

  export type ExpenseSumAggregateInputType = {
    expense_id?: true
    trip_id?: true
    sum?: true
  }

  export type ExpenseMinAggregateInputType = {
    expense_id?: true
    name?: true
    trip_id?: true
    sum?: true
    is_settled?: true
  }

  export type ExpenseMaxAggregateInputType = {
    expense_id?: true
    name?: true
    trip_id?: true
    sum?: true
    is_settled?: true
  }

  export type ExpenseCountAggregateInputType = {
    expense_id?: true
    name?: true
    trip_id?: true
    sum?: true
    is_settled?: true
    _all?: true
  }

  export type ExpenseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which expense to aggregate.
     */
    where?: expenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of expenses to fetch.
     */
    orderBy?: expenseOrderByWithRelationInput | expenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: expenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned expenses
    **/
    _count?: true | ExpenseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExpenseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExpenseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExpenseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExpenseMaxAggregateInputType
  }

  export type GetExpenseAggregateType<T extends ExpenseAggregateArgs> = {
        [P in keyof T & keyof AggregateExpense]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExpense[P]>
      : GetScalarType<T[P], AggregateExpense[P]>
  }




  export type expenseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: expenseWhereInput
    orderBy?: expenseOrderByWithAggregationInput | expenseOrderByWithAggregationInput[]
    by: ExpenseScalarFieldEnum[] | ExpenseScalarFieldEnum
    having?: expenseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExpenseCountAggregateInputType | true
    _avg?: ExpenseAvgAggregateInputType
    _sum?: ExpenseSumAggregateInputType
    _min?: ExpenseMinAggregateInputType
    _max?: ExpenseMaxAggregateInputType
  }

  export type ExpenseGroupByOutputType = {
    expense_id: number
    name: string
    trip_id: number
    sum: number
    is_settled: boolean
    _count: ExpenseCountAggregateOutputType | null
    _avg: ExpenseAvgAggregateOutputType | null
    _sum: ExpenseSumAggregateOutputType | null
    _min: ExpenseMinAggregateOutputType | null
    _max: ExpenseMaxAggregateOutputType | null
  }

  type GetExpenseGroupByPayload<T extends expenseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExpenseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExpenseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExpenseGroupByOutputType[P]>
            : GetScalarType<T[P], ExpenseGroupByOutputType[P]>
        }
      >
    >


  export type expenseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    expense_id?: boolean
    name?: boolean
    trip_id?: boolean
    sum?: boolean
    is_settled?: boolean
    trip?: boolean | tripDefaultArgs<ExtArgs>
    participant_expences?: boolean | expense$participant_expencesArgs<ExtArgs>
    _count?: boolean | ExpenseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["expense"]>

  export type expenseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    expense_id?: boolean
    name?: boolean
    trip_id?: boolean
    sum?: boolean
    is_settled?: boolean
    trip?: boolean | tripDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["expense"]>

  export type expenseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    expense_id?: boolean
    name?: boolean
    trip_id?: boolean
    sum?: boolean
    is_settled?: boolean
    trip?: boolean | tripDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["expense"]>

  export type expenseSelectScalar = {
    expense_id?: boolean
    name?: boolean
    trip_id?: boolean
    sum?: boolean
    is_settled?: boolean
  }

  export type expenseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"expense_id" | "name" | "trip_id" | "sum" | "is_settled", ExtArgs["result"]["expense"]>
  export type expenseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trip?: boolean | tripDefaultArgs<ExtArgs>
    participant_expences?: boolean | expense$participant_expencesArgs<ExtArgs>
    _count?: boolean | ExpenseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type expenseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trip?: boolean | tripDefaultArgs<ExtArgs>
  }
  export type expenseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trip?: boolean | tripDefaultArgs<ExtArgs>
  }

  export type $expensePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "expense"
    objects: {
      trip: Prisma.$tripPayload<ExtArgs>
      participant_expences: Prisma.$participant_expensePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      expense_id: number
      name: string
      trip_id: number
      sum: number
      is_settled: boolean
    }, ExtArgs["result"]["expense"]>
    composites: {}
  }

  type expenseGetPayload<S extends boolean | null | undefined | expenseDefaultArgs> = $Result.GetResult<Prisma.$expensePayload, S>

  type expenseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<expenseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExpenseCountAggregateInputType | true
    }

  export interface expenseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['expense'], meta: { name: 'expense' } }
    /**
     * Find zero or one Expense that matches the filter.
     * @param {expenseFindUniqueArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends expenseFindUniqueArgs>(args: SelectSubset<T, expenseFindUniqueArgs<ExtArgs>>): Prisma__expenseClient<$Result.GetResult<Prisma.$expensePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Expense that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {expenseFindUniqueOrThrowArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends expenseFindUniqueOrThrowArgs>(args: SelectSubset<T, expenseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__expenseClient<$Result.GetResult<Prisma.$expensePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Expense that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {expenseFindFirstArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends expenseFindFirstArgs>(args?: SelectSubset<T, expenseFindFirstArgs<ExtArgs>>): Prisma__expenseClient<$Result.GetResult<Prisma.$expensePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Expense that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {expenseFindFirstOrThrowArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends expenseFindFirstOrThrowArgs>(args?: SelectSubset<T, expenseFindFirstOrThrowArgs<ExtArgs>>): Prisma__expenseClient<$Result.GetResult<Prisma.$expensePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Expenses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {expenseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Expenses
     * const expenses = await prisma.expense.findMany()
     * 
     * // Get first 10 Expenses
     * const expenses = await prisma.expense.findMany({ take: 10 })
     * 
     * // Only select the `expense_id`
     * const expenseWithExpense_idOnly = await prisma.expense.findMany({ select: { expense_id: true } })
     * 
     */
    findMany<T extends expenseFindManyArgs>(args?: SelectSubset<T, expenseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$expensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Expense.
     * @param {expenseCreateArgs} args - Arguments to create a Expense.
     * @example
     * // Create one Expense
     * const Expense = await prisma.expense.create({
     *   data: {
     *     // ... data to create a Expense
     *   }
     * })
     * 
     */
    create<T extends expenseCreateArgs>(args: SelectSubset<T, expenseCreateArgs<ExtArgs>>): Prisma__expenseClient<$Result.GetResult<Prisma.$expensePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Expenses.
     * @param {expenseCreateManyArgs} args - Arguments to create many Expenses.
     * @example
     * // Create many Expenses
     * const expense = await prisma.expense.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends expenseCreateManyArgs>(args?: SelectSubset<T, expenseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Expenses and returns the data saved in the database.
     * @param {expenseCreateManyAndReturnArgs} args - Arguments to create many Expenses.
     * @example
     * // Create many Expenses
     * const expense = await prisma.expense.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Expenses and only return the `expense_id`
     * const expenseWithExpense_idOnly = await prisma.expense.createManyAndReturn({
     *   select: { expense_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends expenseCreateManyAndReturnArgs>(args?: SelectSubset<T, expenseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$expensePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Expense.
     * @param {expenseDeleteArgs} args - Arguments to delete one Expense.
     * @example
     * // Delete one Expense
     * const Expense = await prisma.expense.delete({
     *   where: {
     *     // ... filter to delete one Expense
     *   }
     * })
     * 
     */
    delete<T extends expenseDeleteArgs>(args: SelectSubset<T, expenseDeleteArgs<ExtArgs>>): Prisma__expenseClient<$Result.GetResult<Prisma.$expensePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Expense.
     * @param {expenseUpdateArgs} args - Arguments to update one Expense.
     * @example
     * // Update one Expense
     * const expense = await prisma.expense.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends expenseUpdateArgs>(args: SelectSubset<T, expenseUpdateArgs<ExtArgs>>): Prisma__expenseClient<$Result.GetResult<Prisma.$expensePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Expenses.
     * @param {expenseDeleteManyArgs} args - Arguments to filter Expenses to delete.
     * @example
     * // Delete a few Expenses
     * const { count } = await prisma.expense.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends expenseDeleteManyArgs>(args?: SelectSubset<T, expenseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Expenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {expenseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Expenses
     * const expense = await prisma.expense.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends expenseUpdateManyArgs>(args: SelectSubset<T, expenseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Expenses and returns the data updated in the database.
     * @param {expenseUpdateManyAndReturnArgs} args - Arguments to update many Expenses.
     * @example
     * // Update many Expenses
     * const expense = await prisma.expense.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Expenses and only return the `expense_id`
     * const expenseWithExpense_idOnly = await prisma.expense.updateManyAndReturn({
     *   select: { expense_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends expenseUpdateManyAndReturnArgs>(args: SelectSubset<T, expenseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$expensePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Expense.
     * @param {expenseUpsertArgs} args - Arguments to update or create a Expense.
     * @example
     * // Update or create a Expense
     * const expense = await prisma.expense.upsert({
     *   create: {
     *     // ... data to create a Expense
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Expense we want to update
     *   }
     * })
     */
    upsert<T extends expenseUpsertArgs>(args: SelectSubset<T, expenseUpsertArgs<ExtArgs>>): Prisma__expenseClient<$Result.GetResult<Prisma.$expensePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Expenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {expenseCountArgs} args - Arguments to filter Expenses to count.
     * @example
     * // Count the number of Expenses
     * const count = await prisma.expense.count({
     *   where: {
     *     // ... the filter for the Expenses we want to count
     *   }
     * })
    **/
    count<T extends expenseCountArgs>(
      args?: Subset<T, expenseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExpenseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Expense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExpenseAggregateArgs>(args: Subset<T, ExpenseAggregateArgs>): Prisma.PrismaPromise<GetExpenseAggregateType<T>>

    /**
     * Group by Expense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {expenseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends expenseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: expenseGroupByArgs['orderBy'] }
        : { orderBy?: expenseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, expenseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExpenseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the expense model
   */
  readonly fields: expenseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for expense.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__expenseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trip<T extends tripDefaultArgs<ExtArgs> = {}>(args?: Subset<T, tripDefaultArgs<ExtArgs>>): Prisma__tripClient<$Result.GetResult<Prisma.$tripPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    participant_expences<T extends expense$participant_expencesArgs<ExtArgs> = {}>(args?: Subset<T, expense$participant_expencesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$participant_expensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the expense model
   */
  interface expenseFieldRefs {
    readonly expense_id: FieldRef<"expense", 'Int'>
    readonly name: FieldRef<"expense", 'String'>
    readonly trip_id: FieldRef<"expense", 'Int'>
    readonly sum: FieldRef<"expense", 'Float'>
    readonly is_settled: FieldRef<"expense", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * expense findUnique
   */
  export type expenseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expense
     */
    select?: expenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expense
     */
    omit?: expenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expenseInclude<ExtArgs> | null
    /**
     * Filter, which expense to fetch.
     */
    where: expenseWhereUniqueInput
  }

  /**
   * expense findUniqueOrThrow
   */
  export type expenseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expense
     */
    select?: expenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expense
     */
    omit?: expenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expenseInclude<ExtArgs> | null
    /**
     * Filter, which expense to fetch.
     */
    where: expenseWhereUniqueInput
  }

  /**
   * expense findFirst
   */
  export type expenseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expense
     */
    select?: expenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expense
     */
    omit?: expenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expenseInclude<ExtArgs> | null
    /**
     * Filter, which expense to fetch.
     */
    where?: expenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of expenses to fetch.
     */
    orderBy?: expenseOrderByWithRelationInput | expenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for expenses.
     */
    cursor?: expenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of expenses.
     */
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * expense findFirstOrThrow
   */
  export type expenseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expense
     */
    select?: expenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expense
     */
    omit?: expenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expenseInclude<ExtArgs> | null
    /**
     * Filter, which expense to fetch.
     */
    where?: expenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of expenses to fetch.
     */
    orderBy?: expenseOrderByWithRelationInput | expenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for expenses.
     */
    cursor?: expenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of expenses.
     */
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * expense findMany
   */
  export type expenseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expense
     */
    select?: expenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expense
     */
    omit?: expenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expenseInclude<ExtArgs> | null
    /**
     * Filter, which expenses to fetch.
     */
    where?: expenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of expenses to fetch.
     */
    orderBy?: expenseOrderByWithRelationInput | expenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing expenses.
     */
    cursor?: expenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` expenses.
     */
    skip?: number
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * expense create
   */
  export type expenseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expense
     */
    select?: expenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expense
     */
    omit?: expenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expenseInclude<ExtArgs> | null
    /**
     * The data needed to create a expense.
     */
    data: XOR<expenseCreateInput, expenseUncheckedCreateInput>
  }

  /**
   * expense createMany
   */
  export type expenseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many expenses.
     */
    data: expenseCreateManyInput | expenseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * expense createManyAndReturn
   */
  export type expenseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expense
     */
    select?: expenseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the expense
     */
    omit?: expenseOmit<ExtArgs> | null
    /**
     * The data used to create many expenses.
     */
    data: expenseCreateManyInput | expenseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expenseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * expense update
   */
  export type expenseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expense
     */
    select?: expenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expense
     */
    omit?: expenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expenseInclude<ExtArgs> | null
    /**
     * The data needed to update a expense.
     */
    data: XOR<expenseUpdateInput, expenseUncheckedUpdateInput>
    /**
     * Choose, which expense to update.
     */
    where: expenseWhereUniqueInput
  }

  /**
   * expense updateMany
   */
  export type expenseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update expenses.
     */
    data: XOR<expenseUpdateManyMutationInput, expenseUncheckedUpdateManyInput>
    /**
     * Filter which expenses to update
     */
    where?: expenseWhereInput
    /**
     * Limit how many expenses to update.
     */
    limit?: number
  }

  /**
   * expense updateManyAndReturn
   */
  export type expenseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expense
     */
    select?: expenseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the expense
     */
    omit?: expenseOmit<ExtArgs> | null
    /**
     * The data used to update expenses.
     */
    data: XOR<expenseUpdateManyMutationInput, expenseUncheckedUpdateManyInput>
    /**
     * Filter which expenses to update
     */
    where?: expenseWhereInput
    /**
     * Limit how many expenses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expenseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * expense upsert
   */
  export type expenseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expense
     */
    select?: expenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expense
     */
    omit?: expenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expenseInclude<ExtArgs> | null
    /**
     * The filter to search for the expense to update in case it exists.
     */
    where: expenseWhereUniqueInput
    /**
     * In case the expense found by the `where` argument doesn't exist, create a new expense with this data.
     */
    create: XOR<expenseCreateInput, expenseUncheckedCreateInput>
    /**
     * In case the expense was found with the provided `where` argument, update it with this data.
     */
    update: XOR<expenseUpdateInput, expenseUncheckedUpdateInput>
  }

  /**
   * expense delete
   */
  export type expenseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expense
     */
    select?: expenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expense
     */
    omit?: expenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expenseInclude<ExtArgs> | null
    /**
     * Filter which expense to delete.
     */
    where: expenseWhereUniqueInput
  }

  /**
   * expense deleteMany
   */
  export type expenseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which expenses to delete
     */
    where?: expenseWhereInput
    /**
     * Limit how many expenses to delete.
     */
    limit?: number
  }

  /**
   * expense.participant_expences
   */
  export type expense$participant_expencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant_expense
     */
    select?: participant_expenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant_expense
     */
    omit?: participant_expenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participant_expenseInclude<ExtArgs> | null
    where?: participant_expenseWhereInput
    orderBy?: participant_expenseOrderByWithRelationInput | participant_expenseOrderByWithRelationInput[]
    cursor?: participant_expenseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Participant_expenseScalarFieldEnum | Participant_expenseScalarFieldEnum[]
  }

  /**
   * expense without action
   */
  export type expenseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expense
     */
    select?: expenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expense
     */
    omit?: expenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expenseInclude<ExtArgs> | null
  }


  /**
   * Model participant_expense
   */

  export type AggregateParticipant_expense = {
    _count: Participant_expenseCountAggregateOutputType | null
    _avg: Participant_expenseAvgAggregateOutputType | null
    _sum: Participant_expenseSumAggregateOutputType | null
    _min: Participant_expenseMinAggregateOutputType | null
    _max: Participant_expenseMaxAggregateOutputType | null
  }

  export type Participant_expenseAvgAggregateOutputType = {
    expense_id: number | null
    participant_id: number | null
    part: number | null
  }

  export type Participant_expenseSumAggregateOutputType = {
    expense_id: number | null
    participant_id: number | null
    part: number | null
  }

  export type Participant_expenseMinAggregateOutputType = {
    expense_id: number | null
    participant_id: number | null
    part: number | null
  }

  export type Participant_expenseMaxAggregateOutputType = {
    expense_id: number | null
    participant_id: number | null
    part: number | null
  }

  export type Participant_expenseCountAggregateOutputType = {
    expense_id: number
    participant_id: number
    part: number
    _all: number
  }


  export type Participant_expenseAvgAggregateInputType = {
    expense_id?: true
    participant_id?: true
    part?: true
  }

  export type Participant_expenseSumAggregateInputType = {
    expense_id?: true
    participant_id?: true
    part?: true
  }

  export type Participant_expenseMinAggregateInputType = {
    expense_id?: true
    participant_id?: true
    part?: true
  }

  export type Participant_expenseMaxAggregateInputType = {
    expense_id?: true
    participant_id?: true
    part?: true
  }

  export type Participant_expenseCountAggregateInputType = {
    expense_id?: true
    participant_id?: true
    part?: true
    _all?: true
  }

  export type Participant_expenseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which participant_expense to aggregate.
     */
    where?: participant_expenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of participant_expenses to fetch.
     */
    orderBy?: participant_expenseOrderByWithRelationInput | participant_expenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: participant_expenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` participant_expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` participant_expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned participant_expenses
    **/
    _count?: true | Participant_expenseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Participant_expenseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Participant_expenseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Participant_expenseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Participant_expenseMaxAggregateInputType
  }

  export type GetParticipant_expenseAggregateType<T extends Participant_expenseAggregateArgs> = {
        [P in keyof T & keyof AggregateParticipant_expense]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateParticipant_expense[P]>
      : GetScalarType<T[P], AggregateParticipant_expense[P]>
  }




  export type participant_expenseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: participant_expenseWhereInput
    orderBy?: participant_expenseOrderByWithAggregationInput | participant_expenseOrderByWithAggregationInput[]
    by: Participant_expenseScalarFieldEnum[] | Participant_expenseScalarFieldEnum
    having?: participant_expenseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Participant_expenseCountAggregateInputType | true
    _avg?: Participant_expenseAvgAggregateInputType
    _sum?: Participant_expenseSumAggregateInputType
    _min?: Participant_expenseMinAggregateInputType
    _max?: Participant_expenseMaxAggregateInputType
  }

  export type Participant_expenseGroupByOutputType = {
    expense_id: number
    participant_id: number
    part: number
    _count: Participant_expenseCountAggregateOutputType | null
    _avg: Participant_expenseAvgAggregateOutputType | null
    _sum: Participant_expenseSumAggregateOutputType | null
    _min: Participant_expenseMinAggregateOutputType | null
    _max: Participant_expenseMaxAggregateOutputType | null
  }

  type GetParticipant_expenseGroupByPayload<T extends participant_expenseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Participant_expenseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Participant_expenseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Participant_expenseGroupByOutputType[P]>
            : GetScalarType<T[P], Participant_expenseGroupByOutputType[P]>
        }
      >
    >


  export type participant_expenseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    expense_id?: boolean
    participant_id?: boolean
    part?: boolean
    expense?: boolean | expenseDefaultArgs<ExtArgs>
    participant?: boolean | participantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["participant_expense"]>

  export type participant_expenseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    expense_id?: boolean
    participant_id?: boolean
    part?: boolean
    expense?: boolean | expenseDefaultArgs<ExtArgs>
    participant?: boolean | participantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["participant_expense"]>

  export type participant_expenseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    expense_id?: boolean
    participant_id?: boolean
    part?: boolean
    expense?: boolean | expenseDefaultArgs<ExtArgs>
    participant?: boolean | participantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["participant_expense"]>

  export type participant_expenseSelectScalar = {
    expense_id?: boolean
    participant_id?: boolean
    part?: boolean
  }

  export type participant_expenseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"expense_id" | "participant_id" | "part", ExtArgs["result"]["participant_expense"]>
  export type participant_expenseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    expense?: boolean | expenseDefaultArgs<ExtArgs>
    participant?: boolean | participantDefaultArgs<ExtArgs>
  }
  export type participant_expenseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    expense?: boolean | expenseDefaultArgs<ExtArgs>
    participant?: boolean | participantDefaultArgs<ExtArgs>
  }
  export type participant_expenseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    expense?: boolean | expenseDefaultArgs<ExtArgs>
    participant?: boolean | participantDefaultArgs<ExtArgs>
  }

  export type $participant_expensePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "participant_expense"
    objects: {
      expense: Prisma.$expensePayload<ExtArgs>
      participant: Prisma.$participantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      expense_id: number
      participant_id: number
      part: number
    }, ExtArgs["result"]["participant_expense"]>
    composites: {}
  }

  type participant_expenseGetPayload<S extends boolean | null | undefined | participant_expenseDefaultArgs> = $Result.GetResult<Prisma.$participant_expensePayload, S>

  type participant_expenseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<participant_expenseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Participant_expenseCountAggregateInputType | true
    }

  export interface participant_expenseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['participant_expense'], meta: { name: 'participant_expense' } }
    /**
     * Find zero or one Participant_expense that matches the filter.
     * @param {participant_expenseFindUniqueArgs} args - Arguments to find a Participant_expense
     * @example
     * // Get one Participant_expense
     * const participant_expense = await prisma.participant_expense.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends participant_expenseFindUniqueArgs>(args: SelectSubset<T, participant_expenseFindUniqueArgs<ExtArgs>>): Prisma__participant_expenseClient<$Result.GetResult<Prisma.$participant_expensePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Participant_expense that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {participant_expenseFindUniqueOrThrowArgs} args - Arguments to find a Participant_expense
     * @example
     * // Get one Participant_expense
     * const participant_expense = await prisma.participant_expense.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends participant_expenseFindUniqueOrThrowArgs>(args: SelectSubset<T, participant_expenseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__participant_expenseClient<$Result.GetResult<Prisma.$participant_expensePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Participant_expense that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {participant_expenseFindFirstArgs} args - Arguments to find a Participant_expense
     * @example
     * // Get one Participant_expense
     * const participant_expense = await prisma.participant_expense.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends participant_expenseFindFirstArgs>(args?: SelectSubset<T, participant_expenseFindFirstArgs<ExtArgs>>): Prisma__participant_expenseClient<$Result.GetResult<Prisma.$participant_expensePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Participant_expense that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {participant_expenseFindFirstOrThrowArgs} args - Arguments to find a Participant_expense
     * @example
     * // Get one Participant_expense
     * const participant_expense = await prisma.participant_expense.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends participant_expenseFindFirstOrThrowArgs>(args?: SelectSubset<T, participant_expenseFindFirstOrThrowArgs<ExtArgs>>): Prisma__participant_expenseClient<$Result.GetResult<Prisma.$participant_expensePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Participant_expenses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {participant_expenseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Participant_expenses
     * const participant_expenses = await prisma.participant_expense.findMany()
     * 
     * // Get first 10 Participant_expenses
     * const participant_expenses = await prisma.participant_expense.findMany({ take: 10 })
     * 
     * // Only select the `expense_id`
     * const participant_expenseWithExpense_idOnly = await prisma.participant_expense.findMany({ select: { expense_id: true } })
     * 
     */
    findMany<T extends participant_expenseFindManyArgs>(args?: SelectSubset<T, participant_expenseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$participant_expensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Participant_expense.
     * @param {participant_expenseCreateArgs} args - Arguments to create a Participant_expense.
     * @example
     * // Create one Participant_expense
     * const Participant_expense = await prisma.participant_expense.create({
     *   data: {
     *     // ... data to create a Participant_expense
     *   }
     * })
     * 
     */
    create<T extends participant_expenseCreateArgs>(args: SelectSubset<T, participant_expenseCreateArgs<ExtArgs>>): Prisma__participant_expenseClient<$Result.GetResult<Prisma.$participant_expensePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Participant_expenses.
     * @param {participant_expenseCreateManyArgs} args - Arguments to create many Participant_expenses.
     * @example
     * // Create many Participant_expenses
     * const participant_expense = await prisma.participant_expense.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends participant_expenseCreateManyArgs>(args?: SelectSubset<T, participant_expenseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Participant_expenses and returns the data saved in the database.
     * @param {participant_expenseCreateManyAndReturnArgs} args - Arguments to create many Participant_expenses.
     * @example
     * // Create many Participant_expenses
     * const participant_expense = await prisma.participant_expense.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Participant_expenses and only return the `expense_id`
     * const participant_expenseWithExpense_idOnly = await prisma.participant_expense.createManyAndReturn({
     *   select: { expense_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends participant_expenseCreateManyAndReturnArgs>(args?: SelectSubset<T, participant_expenseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$participant_expensePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Participant_expense.
     * @param {participant_expenseDeleteArgs} args - Arguments to delete one Participant_expense.
     * @example
     * // Delete one Participant_expense
     * const Participant_expense = await prisma.participant_expense.delete({
     *   where: {
     *     // ... filter to delete one Participant_expense
     *   }
     * })
     * 
     */
    delete<T extends participant_expenseDeleteArgs>(args: SelectSubset<T, participant_expenseDeleteArgs<ExtArgs>>): Prisma__participant_expenseClient<$Result.GetResult<Prisma.$participant_expensePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Participant_expense.
     * @param {participant_expenseUpdateArgs} args - Arguments to update one Participant_expense.
     * @example
     * // Update one Participant_expense
     * const participant_expense = await prisma.participant_expense.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends participant_expenseUpdateArgs>(args: SelectSubset<T, participant_expenseUpdateArgs<ExtArgs>>): Prisma__participant_expenseClient<$Result.GetResult<Prisma.$participant_expensePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Participant_expenses.
     * @param {participant_expenseDeleteManyArgs} args - Arguments to filter Participant_expenses to delete.
     * @example
     * // Delete a few Participant_expenses
     * const { count } = await prisma.participant_expense.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends participant_expenseDeleteManyArgs>(args?: SelectSubset<T, participant_expenseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Participant_expenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {participant_expenseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Participant_expenses
     * const participant_expense = await prisma.participant_expense.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends participant_expenseUpdateManyArgs>(args: SelectSubset<T, participant_expenseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Participant_expenses and returns the data updated in the database.
     * @param {participant_expenseUpdateManyAndReturnArgs} args - Arguments to update many Participant_expenses.
     * @example
     * // Update many Participant_expenses
     * const participant_expense = await prisma.participant_expense.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Participant_expenses and only return the `expense_id`
     * const participant_expenseWithExpense_idOnly = await prisma.participant_expense.updateManyAndReturn({
     *   select: { expense_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends participant_expenseUpdateManyAndReturnArgs>(args: SelectSubset<T, participant_expenseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$participant_expensePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Participant_expense.
     * @param {participant_expenseUpsertArgs} args - Arguments to update or create a Participant_expense.
     * @example
     * // Update or create a Participant_expense
     * const participant_expense = await prisma.participant_expense.upsert({
     *   create: {
     *     // ... data to create a Participant_expense
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Participant_expense we want to update
     *   }
     * })
     */
    upsert<T extends participant_expenseUpsertArgs>(args: SelectSubset<T, participant_expenseUpsertArgs<ExtArgs>>): Prisma__participant_expenseClient<$Result.GetResult<Prisma.$participant_expensePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Participant_expenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {participant_expenseCountArgs} args - Arguments to filter Participant_expenses to count.
     * @example
     * // Count the number of Participant_expenses
     * const count = await prisma.participant_expense.count({
     *   where: {
     *     // ... the filter for the Participant_expenses we want to count
     *   }
     * })
    **/
    count<T extends participant_expenseCountArgs>(
      args?: Subset<T, participant_expenseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Participant_expenseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Participant_expense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Participant_expenseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Participant_expenseAggregateArgs>(args: Subset<T, Participant_expenseAggregateArgs>): Prisma.PrismaPromise<GetParticipant_expenseAggregateType<T>>

    /**
     * Group by Participant_expense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {participant_expenseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends participant_expenseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: participant_expenseGroupByArgs['orderBy'] }
        : { orderBy?: participant_expenseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, participant_expenseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParticipant_expenseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the participant_expense model
   */
  readonly fields: participant_expenseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for participant_expense.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__participant_expenseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    expense<T extends expenseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, expenseDefaultArgs<ExtArgs>>): Prisma__expenseClient<$Result.GetResult<Prisma.$expensePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    participant<T extends participantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, participantDefaultArgs<ExtArgs>>): Prisma__participantClient<$Result.GetResult<Prisma.$participantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the participant_expense model
   */
  interface participant_expenseFieldRefs {
    readonly expense_id: FieldRef<"participant_expense", 'Int'>
    readonly participant_id: FieldRef<"participant_expense", 'Int'>
    readonly part: FieldRef<"participant_expense", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * participant_expense findUnique
   */
  export type participant_expenseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant_expense
     */
    select?: participant_expenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant_expense
     */
    omit?: participant_expenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participant_expenseInclude<ExtArgs> | null
    /**
     * Filter, which participant_expense to fetch.
     */
    where: participant_expenseWhereUniqueInput
  }

  /**
   * participant_expense findUniqueOrThrow
   */
  export type participant_expenseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant_expense
     */
    select?: participant_expenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant_expense
     */
    omit?: participant_expenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participant_expenseInclude<ExtArgs> | null
    /**
     * Filter, which participant_expense to fetch.
     */
    where: participant_expenseWhereUniqueInput
  }

  /**
   * participant_expense findFirst
   */
  export type participant_expenseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant_expense
     */
    select?: participant_expenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant_expense
     */
    omit?: participant_expenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participant_expenseInclude<ExtArgs> | null
    /**
     * Filter, which participant_expense to fetch.
     */
    where?: participant_expenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of participant_expenses to fetch.
     */
    orderBy?: participant_expenseOrderByWithRelationInput | participant_expenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for participant_expenses.
     */
    cursor?: participant_expenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` participant_expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` participant_expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of participant_expenses.
     */
    distinct?: Participant_expenseScalarFieldEnum | Participant_expenseScalarFieldEnum[]
  }

  /**
   * participant_expense findFirstOrThrow
   */
  export type participant_expenseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant_expense
     */
    select?: participant_expenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant_expense
     */
    omit?: participant_expenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participant_expenseInclude<ExtArgs> | null
    /**
     * Filter, which participant_expense to fetch.
     */
    where?: participant_expenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of participant_expenses to fetch.
     */
    orderBy?: participant_expenseOrderByWithRelationInput | participant_expenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for participant_expenses.
     */
    cursor?: participant_expenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` participant_expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` participant_expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of participant_expenses.
     */
    distinct?: Participant_expenseScalarFieldEnum | Participant_expenseScalarFieldEnum[]
  }

  /**
   * participant_expense findMany
   */
  export type participant_expenseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant_expense
     */
    select?: participant_expenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant_expense
     */
    omit?: participant_expenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participant_expenseInclude<ExtArgs> | null
    /**
     * Filter, which participant_expenses to fetch.
     */
    where?: participant_expenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of participant_expenses to fetch.
     */
    orderBy?: participant_expenseOrderByWithRelationInput | participant_expenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing participant_expenses.
     */
    cursor?: participant_expenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` participant_expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` participant_expenses.
     */
    skip?: number
    distinct?: Participant_expenseScalarFieldEnum | Participant_expenseScalarFieldEnum[]
  }

  /**
   * participant_expense create
   */
  export type participant_expenseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant_expense
     */
    select?: participant_expenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant_expense
     */
    omit?: participant_expenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participant_expenseInclude<ExtArgs> | null
    /**
     * The data needed to create a participant_expense.
     */
    data: XOR<participant_expenseCreateInput, participant_expenseUncheckedCreateInput>
  }

  /**
   * participant_expense createMany
   */
  export type participant_expenseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many participant_expenses.
     */
    data: participant_expenseCreateManyInput | participant_expenseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * participant_expense createManyAndReturn
   */
  export type participant_expenseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant_expense
     */
    select?: participant_expenseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the participant_expense
     */
    omit?: participant_expenseOmit<ExtArgs> | null
    /**
     * The data used to create many participant_expenses.
     */
    data: participant_expenseCreateManyInput | participant_expenseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participant_expenseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * participant_expense update
   */
  export type participant_expenseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant_expense
     */
    select?: participant_expenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant_expense
     */
    omit?: participant_expenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participant_expenseInclude<ExtArgs> | null
    /**
     * The data needed to update a participant_expense.
     */
    data: XOR<participant_expenseUpdateInput, participant_expenseUncheckedUpdateInput>
    /**
     * Choose, which participant_expense to update.
     */
    where: participant_expenseWhereUniqueInput
  }

  /**
   * participant_expense updateMany
   */
  export type participant_expenseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update participant_expenses.
     */
    data: XOR<participant_expenseUpdateManyMutationInput, participant_expenseUncheckedUpdateManyInput>
    /**
     * Filter which participant_expenses to update
     */
    where?: participant_expenseWhereInput
    /**
     * Limit how many participant_expenses to update.
     */
    limit?: number
  }

  /**
   * participant_expense updateManyAndReturn
   */
  export type participant_expenseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant_expense
     */
    select?: participant_expenseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the participant_expense
     */
    omit?: participant_expenseOmit<ExtArgs> | null
    /**
     * The data used to update participant_expenses.
     */
    data: XOR<participant_expenseUpdateManyMutationInput, participant_expenseUncheckedUpdateManyInput>
    /**
     * Filter which participant_expenses to update
     */
    where?: participant_expenseWhereInput
    /**
     * Limit how many participant_expenses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participant_expenseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * participant_expense upsert
   */
  export type participant_expenseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant_expense
     */
    select?: participant_expenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant_expense
     */
    omit?: participant_expenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participant_expenseInclude<ExtArgs> | null
    /**
     * The filter to search for the participant_expense to update in case it exists.
     */
    where: participant_expenseWhereUniqueInput
    /**
     * In case the participant_expense found by the `where` argument doesn't exist, create a new participant_expense with this data.
     */
    create: XOR<participant_expenseCreateInput, participant_expenseUncheckedCreateInput>
    /**
     * In case the participant_expense was found with the provided `where` argument, update it with this data.
     */
    update: XOR<participant_expenseUpdateInput, participant_expenseUncheckedUpdateInput>
  }

  /**
   * participant_expense delete
   */
  export type participant_expenseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant_expense
     */
    select?: participant_expenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant_expense
     */
    omit?: participant_expenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participant_expenseInclude<ExtArgs> | null
    /**
     * Filter which participant_expense to delete.
     */
    where: participant_expenseWhereUniqueInput
  }

  /**
   * participant_expense deleteMany
   */
  export type participant_expenseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which participant_expenses to delete
     */
    where?: participant_expenseWhereInput
    /**
     * Limit how many participant_expenses to delete.
     */
    limit?: number
  }

  /**
   * participant_expense without action
   */
  export type participant_expenseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant_expense
     */
    select?: participant_expenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant_expense
     */
    omit?: participant_expenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participant_expenseInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const TripScalarFieldEnum: {
    trip_id: 'trip_id',
    name: 'name',
    start: 'start',
    end: 'end',
    status: 'status'
  };

  export type TripScalarFieldEnum = (typeof TripScalarFieldEnum)[keyof typeof TripScalarFieldEnum]


  export const ParticipantScalarFieldEnum: {
    participant_id: 'participant_id',
    name: 'name',
    email: 'email'
  };

  export type ParticipantScalarFieldEnum = (typeof ParticipantScalarFieldEnum)[keyof typeof ParticipantScalarFieldEnum]


  export const Trip_participantScalarFieldEnum: {
    trip_id: 'trip_id',
    participant_id: 'participant_id'
  };

  export type Trip_participantScalarFieldEnum = (typeof Trip_participantScalarFieldEnum)[keyof typeof Trip_participantScalarFieldEnum]


  export const ExpenseScalarFieldEnum: {
    expense_id: 'expense_id',
    name: 'name',
    trip_id: 'trip_id',
    sum: 'sum',
    is_settled: 'is_settled'
  };

  export type ExpenseScalarFieldEnum = (typeof ExpenseScalarFieldEnum)[keyof typeof ExpenseScalarFieldEnum]


  export const Participant_expenseScalarFieldEnum: {
    expense_id: 'expense_id',
    participant_id: 'participant_id',
    part: 'part'
  };

  export type Participant_expenseScalarFieldEnum = (typeof Participant_expenseScalarFieldEnum)[keyof typeof Participant_expenseScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'TripStatus'
   */
  export type EnumTripStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TripStatus'>
    


  /**
   * Reference to a field of type 'TripStatus[]'
   */
  export type ListEnumTripStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TripStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type tripWhereInput = {
    AND?: tripWhereInput | tripWhereInput[]
    OR?: tripWhereInput[]
    NOT?: tripWhereInput | tripWhereInput[]
    trip_id?: IntFilter<"trip"> | number
    name?: StringFilter<"trip"> | string
    start?: DateTimeFilter<"trip"> | Date | string
    end?: DateTimeFilter<"trip"> | Date | string
    status?: EnumTripStatusFilter<"trip"> | $Enums.TripStatus
    participants?: Trip_participantListRelationFilter
    expenses?: ExpenseListRelationFilter
  }

  export type tripOrderByWithRelationInput = {
    trip_id?: SortOrder
    name?: SortOrder
    start?: SortOrder
    end?: SortOrder
    status?: SortOrder
    participants?: trip_participantOrderByRelationAggregateInput
    expenses?: expenseOrderByRelationAggregateInput
  }

  export type tripWhereUniqueInput = Prisma.AtLeast<{
    trip_id?: number
    AND?: tripWhereInput | tripWhereInput[]
    OR?: tripWhereInput[]
    NOT?: tripWhereInput | tripWhereInput[]
    name?: StringFilter<"trip"> | string
    start?: DateTimeFilter<"trip"> | Date | string
    end?: DateTimeFilter<"trip"> | Date | string
    status?: EnumTripStatusFilter<"trip"> | $Enums.TripStatus
    participants?: Trip_participantListRelationFilter
    expenses?: ExpenseListRelationFilter
  }, "trip_id">

  export type tripOrderByWithAggregationInput = {
    trip_id?: SortOrder
    name?: SortOrder
    start?: SortOrder
    end?: SortOrder
    status?: SortOrder
    _count?: tripCountOrderByAggregateInput
    _avg?: tripAvgOrderByAggregateInput
    _max?: tripMaxOrderByAggregateInput
    _min?: tripMinOrderByAggregateInput
    _sum?: tripSumOrderByAggregateInput
  }

  export type tripScalarWhereWithAggregatesInput = {
    AND?: tripScalarWhereWithAggregatesInput | tripScalarWhereWithAggregatesInput[]
    OR?: tripScalarWhereWithAggregatesInput[]
    NOT?: tripScalarWhereWithAggregatesInput | tripScalarWhereWithAggregatesInput[]
    trip_id?: IntWithAggregatesFilter<"trip"> | number
    name?: StringWithAggregatesFilter<"trip"> | string
    start?: DateTimeWithAggregatesFilter<"trip"> | Date | string
    end?: DateTimeWithAggregatesFilter<"trip"> | Date | string
    status?: EnumTripStatusWithAggregatesFilter<"trip"> | $Enums.TripStatus
  }

  export type participantWhereInput = {
    AND?: participantWhereInput | participantWhereInput[]
    OR?: participantWhereInput[]
    NOT?: participantWhereInput | participantWhereInput[]
    participant_id?: IntFilter<"participant"> | number
    name?: StringFilter<"participant"> | string
    email?: StringFilter<"participant"> | string
    trips?: Trip_participantListRelationFilter
    participant_expences?: Participant_expenseListRelationFilter
  }

  export type participantOrderByWithRelationInput = {
    participant_id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    trips?: trip_participantOrderByRelationAggregateInput
    participant_expences?: participant_expenseOrderByRelationAggregateInput
  }

  export type participantWhereUniqueInput = Prisma.AtLeast<{
    participant_id?: number
    email?: string
    AND?: participantWhereInput | participantWhereInput[]
    OR?: participantWhereInput[]
    NOT?: participantWhereInput | participantWhereInput[]
    name?: StringFilter<"participant"> | string
    trips?: Trip_participantListRelationFilter
    participant_expences?: Participant_expenseListRelationFilter
  }, "participant_id" | "email">

  export type participantOrderByWithAggregationInput = {
    participant_id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    _count?: participantCountOrderByAggregateInput
    _avg?: participantAvgOrderByAggregateInput
    _max?: participantMaxOrderByAggregateInput
    _min?: participantMinOrderByAggregateInput
    _sum?: participantSumOrderByAggregateInput
  }

  export type participantScalarWhereWithAggregatesInput = {
    AND?: participantScalarWhereWithAggregatesInput | participantScalarWhereWithAggregatesInput[]
    OR?: participantScalarWhereWithAggregatesInput[]
    NOT?: participantScalarWhereWithAggregatesInput | participantScalarWhereWithAggregatesInput[]
    participant_id?: IntWithAggregatesFilter<"participant"> | number
    name?: StringWithAggregatesFilter<"participant"> | string
    email?: StringWithAggregatesFilter<"participant"> | string
  }

  export type trip_participantWhereInput = {
    AND?: trip_participantWhereInput | trip_participantWhereInput[]
    OR?: trip_participantWhereInput[]
    NOT?: trip_participantWhereInput | trip_participantWhereInput[]
    trip_id?: IntFilter<"trip_participant"> | number
    participant_id?: IntFilter<"trip_participant"> | number
    trip?: XOR<TripScalarRelationFilter, tripWhereInput>
    participant?: XOR<ParticipantScalarRelationFilter, participantWhereInput>
  }

  export type trip_participantOrderByWithRelationInput = {
    trip_id?: SortOrder
    participant_id?: SortOrder
    trip?: tripOrderByWithRelationInput
    participant?: participantOrderByWithRelationInput
  }

  export type trip_participantWhereUniqueInput = Prisma.AtLeast<{
    trip_id_participant_id?: trip_participantTrip_idParticipant_idCompoundUniqueInput
    AND?: trip_participantWhereInput | trip_participantWhereInput[]
    OR?: trip_participantWhereInput[]
    NOT?: trip_participantWhereInput | trip_participantWhereInput[]
    trip_id?: IntFilter<"trip_participant"> | number
    participant_id?: IntFilter<"trip_participant"> | number
    trip?: XOR<TripScalarRelationFilter, tripWhereInput>
    participant?: XOR<ParticipantScalarRelationFilter, participantWhereInput>
  }, "trip_id_participant_id">

  export type trip_participantOrderByWithAggregationInput = {
    trip_id?: SortOrder
    participant_id?: SortOrder
    _count?: trip_participantCountOrderByAggregateInput
    _avg?: trip_participantAvgOrderByAggregateInput
    _max?: trip_participantMaxOrderByAggregateInput
    _min?: trip_participantMinOrderByAggregateInput
    _sum?: trip_participantSumOrderByAggregateInput
  }

  export type trip_participantScalarWhereWithAggregatesInput = {
    AND?: trip_participantScalarWhereWithAggregatesInput | trip_participantScalarWhereWithAggregatesInput[]
    OR?: trip_participantScalarWhereWithAggregatesInput[]
    NOT?: trip_participantScalarWhereWithAggregatesInput | trip_participantScalarWhereWithAggregatesInput[]
    trip_id?: IntWithAggregatesFilter<"trip_participant"> | number
    participant_id?: IntWithAggregatesFilter<"trip_participant"> | number
  }

  export type expenseWhereInput = {
    AND?: expenseWhereInput | expenseWhereInput[]
    OR?: expenseWhereInput[]
    NOT?: expenseWhereInput | expenseWhereInput[]
    expense_id?: IntFilter<"expense"> | number
    name?: StringFilter<"expense"> | string
    trip_id?: IntFilter<"expense"> | number
    sum?: FloatFilter<"expense"> | number
    is_settled?: BoolFilter<"expense"> | boolean
    trip?: XOR<TripScalarRelationFilter, tripWhereInput>
    participant_expences?: Participant_expenseListRelationFilter
  }

  export type expenseOrderByWithRelationInput = {
    expense_id?: SortOrder
    name?: SortOrder
    trip_id?: SortOrder
    sum?: SortOrder
    is_settled?: SortOrder
    trip?: tripOrderByWithRelationInput
    participant_expences?: participant_expenseOrderByRelationAggregateInput
  }

  export type expenseWhereUniqueInput = Prisma.AtLeast<{
    expense_id?: number
    AND?: expenseWhereInput | expenseWhereInput[]
    OR?: expenseWhereInput[]
    NOT?: expenseWhereInput | expenseWhereInput[]
    name?: StringFilter<"expense"> | string
    trip_id?: IntFilter<"expense"> | number
    sum?: FloatFilter<"expense"> | number
    is_settled?: BoolFilter<"expense"> | boolean
    trip?: XOR<TripScalarRelationFilter, tripWhereInput>
    participant_expences?: Participant_expenseListRelationFilter
  }, "expense_id">

  export type expenseOrderByWithAggregationInput = {
    expense_id?: SortOrder
    name?: SortOrder
    trip_id?: SortOrder
    sum?: SortOrder
    is_settled?: SortOrder
    _count?: expenseCountOrderByAggregateInput
    _avg?: expenseAvgOrderByAggregateInput
    _max?: expenseMaxOrderByAggregateInput
    _min?: expenseMinOrderByAggregateInput
    _sum?: expenseSumOrderByAggregateInput
  }

  export type expenseScalarWhereWithAggregatesInput = {
    AND?: expenseScalarWhereWithAggregatesInput | expenseScalarWhereWithAggregatesInput[]
    OR?: expenseScalarWhereWithAggregatesInput[]
    NOT?: expenseScalarWhereWithAggregatesInput | expenseScalarWhereWithAggregatesInput[]
    expense_id?: IntWithAggregatesFilter<"expense"> | number
    name?: StringWithAggregatesFilter<"expense"> | string
    trip_id?: IntWithAggregatesFilter<"expense"> | number
    sum?: FloatWithAggregatesFilter<"expense"> | number
    is_settled?: BoolWithAggregatesFilter<"expense"> | boolean
  }

  export type participant_expenseWhereInput = {
    AND?: participant_expenseWhereInput | participant_expenseWhereInput[]
    OR?: participant_expenseWhereInput[]
    NOT?: participant_expenseWhereInput | participant_expenseWhereInput[]
    expense_id?: IntFilter<"participant_expense"> | number
    participant_id?: IntFilter<"participant_expense"> | number
    part?: FloatFilter<"participant_expense"> | number
    expense?: XOR<ExpenseScalarRelationFilter, expenseWhereInput>
    participant?: XOR<ParticipantScalarRelationFilter, participantWhereInput>
  }

  export type participant_expenseOrderByWithRelationInput = {
    expense_id?: SortOrder
    participant_id?: SortOrder
    part?: SortOrder
    expense?: expenseOrderByWithRelationInput
    participant?: participantOrderByWithRelationInput
  }

  export type participant_expenseWhereUniqueInput = Prisma.AtLeast<{
    expense_id_participant_id?: participant_expenseExpense_idParticipant_idCompoundUniqueInput
    AND?: participant_expenseWhereInput | participant_expenseWhereInput[]
    OR?: participant_expenseWhereInput[]
    NOT?: participant_expenseWhereInput | participant_expenseWhereInput[]
    expense_id?: IntFilter<"participant_expense"> | number
    participant_id?: IntFilter<"participant_expense"> | number
    part?: FloatFilter<"participant_expense"> | number
    expense?: XOR<ExpenseScalarRelationFilter, expenseWhereInput>
    participant?: XOR<ParticipantScalarRelationFilter, participantWhereInput>
  }, "expense_id_participant_id">

  export type participant_expenseOrderByWithAggregationInput = {
    expense_id?: SortOrder
    participant_id?: SortOrder
    part?: SortOrder
    _count?: participant_expenseCountOrderByAggregateInput
    _avg?: participant_expenseAvgOrderByAggregateInput
    _max?: participant_expenseMaxOrderByAggregateInput
    _min?: participant_expenseMinOrderByAggregateInput
    _sum?: participant_expenseSumOrderByAggregateInput
  }

  export type participant_expenseScalarWhereWithAggregatesInput = {
    AND?: participant_expenseScalarWhereWithAggregatesInput | participant_expenseScalarWhereWithAggregatesInput[]
    OR?: participant_expenseScalarWhereWithAggregatesInput[]
    NOT?: participant_expenseScalarWhereWithAggregatesInput | participant_expenseScalarWhereWithAggregatesInput[]
    expense_id?: IntWithAggregatesFilter<"participant_expense"> | number
    participant_id?: IntWithAggregatesFilter<"participant_expense"> | number
    part?: FloatWithAggregatesFilter<"participant_expense"> | number
  }

  export type tripCreateInput = {
    name: string
    start: Date | string
    end: Date | string
    status?: $Enums.TripStatus
    participants?: trip_participantCreateNestedManyWithoutTripInput
    expenses?: expenseCreateNestedManyWithoutTripInput
  }

  export type tripUncheckedCreateInput = {
    trip_id?: number
    name: string
    start: Date | string
    end: Date | string
    status?: $Enums.TripStatus
    participants?: trip_participantUncheckedCreateNestedManyWithoutTripInput
    expenses?: expenseUncheckedCreateNestedManyWithoutTripInput
  }

  export type tripUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    start?: DateTimeFieldUpdateOperationsInput | Date | string
    end?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    participants?: trip_participantUpdateManyWithoutTripNestedInput
    expenses?: expenseUpdateManyWithoutTripNestedInput
  }

  export type tripUncheckedUpdateInput = {
    trip_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    start?: DateTimeFieldUpdateOperationsInput | Date | string
    end?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    participants?: trip_participantUncheckedUpdateManyWithoutTripNestedInput
    expenses?: expenseUncheckedUpdateManyWithoutTripNestedInput
  }

  export type tripCreateManyInput = {
    trip_id?: number
    name: string
    start: Date | string
    end: Date | string
    status?: $Enums.TripStatus
  }

  export type tripUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    start?: DateTimeFieldUpdateOperationsInput | Date | string
    end?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
  }

  export type tripUncheckedUpdateManyInput = {
    trip_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    start?: DateTimeFieldUpdateOperationsInput | Date | string
    end?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
  }

  export type participantCreateInput = {
    name: string
    email: string
    trips?: trip_participantCreateNestedManyWithoutParticipantInput
    participant_expences?: participant_expenseCreateNestedManyWithoutParticipantInput
  }

  export type participantUncheckedCreateInput = {
    participant_id?: number
    name: string
    email: string
    trips?: trip_participantUncheckedCreateNestedManyWithoutParticipantInput
    participant_expences?: participant_expenseUncheckedCreateNestedManyWithoutParticipantInput
  }

  export type participantUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    trips?: trip_participantUpdateManyWithoutParticipantNestedInput
    participant_expences?: participant_expenseUpdateManyWithoutParticipantNestedInput
  }

  export type participantUncheckedUpdateInput = {
    participant_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    trips?: trip_participantUncheckedUpdateManyWithoutParticipantNestedInput
    participant_expences?: participant_expenseUncheckedUpdateManyWithoutParticipantNestedInput
  }

  export type participantCreateManyInput = {
    participant_id?: number
    name: string
    email: string
  }

  export type participantUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type participantUncheckedUpdateManyInput = {
    participant_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type trip_participantCreateInput = {
    trip: tripCreateNestedOneWithoutParticipantsInput
    participant: participantCreateNestedOneWithoutTripsInput
  }

  export type trip_participantUncheckedCreateInput = {
    trip_id: number
    participant_id: number
  }

  export type trip_participantUpdateInput = {
    trip?: tripUpdateOneRequiredWithoutParticipantsNestedInput
    participant?: participantUpdateOneRequiredWithoutTripsNestedInput
  }

  export type trip_participantUncheckedUpdateInput = {
    trip_id?: IntFieldUpdateOperationsInput | number
    participant_id?: IntFieldUpdateOperationsInput | number
  }

  export type trip_participantCreateManyInput = {
    trip_id: number
    participant_id: number
  }

  export type trip_participantUpdateManyMutationInput = {

  }

  export type trip_participantUncheckedUpdateManyInput = {
    trip_id?: IntFieldUpdateOperationsInput | number
    participant_id?: IntFieldUpdateOperationsInput | number
  }

  export type expenseCreateInput = {
    name: string
    sum: number
    is_settled?: boolean
    trip: tripCreateNestedOneWithoutExpensesInput
    participant_expences?: participant_expenseCreateNestedManyWithoutExpenseInput
  }

  export type expenseUncheckedCreateInput = {
    expense_id?: number
    name: string
    trip_id: number
    sum: number
    is_settled?: boolean
    participant_expences?: participant_expenseUncheckedCreateNestedManyWithoutExpenseInput
  }

  export type expenseUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    sum?: FloatFieldUpdateOperationsInput | number
    is_settled?: BoolFieldUpdateOperationsInput | boolean
    trip?: tripUpdateOneRequiredWithoutExpensesNestedInput
    participant_expences?: participant_expenseUpdateManyWithoutExpenseNestedInput
  }

  export type expenseUncheckedUpdateInput = {
    expense_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    trip_id?: IntFieldUpdateOperationsInput | number
    sum?: FloatFieldUpdateOperationsInput | number
    is_settled?: BoolFieldUpdateOperationsInput | boolean
    participant_expences?: participant_expenseUncheckedUpdateManyWithoutExpenseNestedInput
  }

  export type expenseCreateManyInput = {
    expense_id?: number
    name: string
    trip_id: number
    sum: number
    is_settled?: boolean
  }

  export type expenseUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    sum?: FloatFieldUpdateOperationsInput | number
    is_settled?: BoolFieldUpdateOperationsInput | boolean
  }

  export type expenseUncheckedUpdateManyInput = {
    expense_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    trip_id?: IntFieldUpdateOperationsInput | number
    sum?: FloatFieldUpdateOperationsInput | number
    is_settled?: BoolFieldUpdateOperationsInput | boolean
  }

  export type participant_expenseCreateInput = {
    part: number
    expense: expenseCreateNestedOneWithoutParticipant_expencesInput
    participant: participantCreateNestedOneWithoutParticipant_expencesInput
  }

  export type participant_expenseUncheckedCreateInput = {
    expense_id: number
    participant_id: number
    part: number
  }

  export type participant_expenseUpdateInput = {
    part?: FloatFieldUpdateOperationsInput | number
    expense?: expenseUpdateOneRequiredWithoutParticipant_expencesNestedInput
    participant?: participantUpdateOneRequiredWithoutParticipant_expencesNestedInput
  }

  export type participant_expenseUncheckedUpdateInput = {
    expense_id?: IntFieldUpdateOperationsInput | number
    participant_id?: IntFieldUpdateOperationsInput | number
    part?: FloatFieldUpdateOperationsInput | number
  }

  export type participant_expenseCreateManyInput = {
    expense_id: number
    participant_id: number
    part: number
  }

  export type participant_expenseUpdateManyMutationInput = {
    part?: FloatFieldUpdateOperationsInput | number
  }

  export type participant_expenseUncheckedUpdateManyInput = {
    expense_id?: IntFieldUpdateOperationsInput | number
    participant_id?: IntFieldUpdateOperationsInput | number
    part?: FloatFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EnumTripStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TripStatus | EnumTripStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TripStatus[] | ListEnumTripStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TripStatus[] | ListEnumTripStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTripStatusFilter<$PrismaModel> | $Enums.TripStatus
  }

  export type Trip_participantListRelationFilter = {
    every?: trip_participantWhereInput
    some?: trip_participantWhereInput
    none?: trip_participantWhereInput
  }

  export type ExpenseListRelationFilter = {
    every?: expenseWhereInput
    some?: expenseWhereInput
    none?: expenseWhereInput
  }

  export type trip_participantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type expenseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type tripCountOrderByAggregateInput = {
    trip_id?: SortOrder
    name?: SortOrder
    start?: SortOrder
    end?: SortOrder
    status?: SortOrder
  }

  export type tripAvgOrderByAggregateInput = {
    trip_id?: SortOrder
  }

  export type tripMaxOrderByAggregateInput = {
    trip_id?: SortOrder
    name?: SortOrder
    start?: SortOrder
    end?: SortOrder
    status?: SortOrder
  }

  export type tripMinOrderByAggregateInput = {
    trip_id?: SortOrder
    name?: SortOrder
    start?: SortOrder
    end?: SortOrder
    status?: SortOrder
  }

  export type tripSumOrderByAggregateInput = {
    trip_id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumTripStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TripStatus | EnumTripStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TripStatus[] | ListEnumTripStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TripStatus[] | ListEnumTripStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTripStatusWithAggregatesFilter<$PrismaModel> | $Enums.TripStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTripStatusFilter<$PrismaModel>
    _max?: NestedEnumTripStatusFilter<$PrismaModel>
  }

  export type Participant_expenseListRelationFilter = {
    every?: participant_expenseWhereInput
    some?: participant_expenseWhereInput
    none?: participant_expenseWhereInput
  }

  export type participant_expenseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type participantCountOrderByAggregateInput = {
    participant_id?: SortOrder
    name?: SortOrder
    email?: SortOrder
  }

  export type participantAvgOrderByAggregateInput = {
    participant_id?: SortOrder
  }

  export type participantMaxOrderByAggregateInput = {
    participant_id?: SortOrder
    name?: SortOrder
    email?: SortOrder
  }

  export type participantMinOrderByAggregateInput = {
    participant_id?: SortOrder
    name?: SortOrder
    email?: SortOrder
  }

  export type participantSumOrderByAggregateInput = {
    participant_id?: SortOrder
  }

  export type TripScalarRelationFilter = {
    is?: tripWhereInput
    isNot?: tripWhereInput
  }

  export type ParticipantScalarRelationFilter = {
    is?: participantWhereInput
    isNot?: participantWhereInput
  }

  export type trip_participantTrip_idParticipant_idCompoundUniqueInput = {
    trip_id: number
    participant_id: number
  }

  export type trip_participantCountOrderByAggregateInput = {
    trip_id?: SortOrder
    participant_id?: SortOrder
  }

  export type trip_participantAvgOrderByAggregateInput = {
    trip_id?: SortOrder
    participant_id?: SortOrder
  }

  export type trip_participantMaxOrderByAggregateInput = {
    trip_id?: SortOrder
    participant_id?: SortOrder
  }

  export type trip_participantMinOrderByAggregateInput = {
    trip_id?: SortOrder
    participant_id?: SortOrder
  }

  export type trip_participantSumOrderByAggregateInput = {
    trip_id?: SortOrder
    participant_id?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type expenseCountOrderByAggregateInput = {
    expense_id?: SortOrder
    name?: SortOrder
    trip_id?: SortOrder
    sum?: SortOrder
    is_settled?: SortOrder
  }

  export type expenseAvgOrderByAggregateInput = {
    expense_id?: SortOrder
    trip_id?: SortOrder
    sum?: SortOrder
  }

  export type expenseMaxOrderByAggregateInput = {
    expense_id?: SortOrder
    name?: SortOrder
    trip_id?: SortOrder
    sum?: SortOrder
    is_settled?: SortOrder
  }

  export type expenseMinOrderByAggregateInput = {
    expense_id?: SortOrder
    name?: SortOrder
    trip_id?: SortOrder
    sum?: SortOrder
    is_settled?: SortOrder
  }

  export type expenseSumOrderByAggregateInput = {
    expense_id?: SortOrder
    trip_id?: SortOrder
    sum?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ExpenseScalarRelationFilter = {
    is?: expenseWhereInput
    isNot?: expenseWhereInput
  }

  export type participant_expenseExpense_idParticipant_idCompoundUniqueInput = {
    expense_id: number
    participant_id: number
  }

  export type participant_expenseCountOrderByAggregateInput = {
    expense_id?: SortOrder
    participant_id?: SortOrder
    part?: SortOrder
  }

  export type participant_expenseAvgOrderByAggregateInput = {
    expense_id?: SortOrder
    participant_id?: SortOrder
    part?: SortOrder
  }

  export type participant_expenseMaxOrderByAggregateInput = {
    expense_id?: SortOrder
    participant_id?: SortOrder
    part?: SortOrder
  }

  export type participant_expenseMinOrderByAggregateInput = {
    expense_id?: SortOrder
    participant_id?: SortOrder
    part?: SortOrder
  }

  export type participant_expenseSumOrderByAggregateInput = {
    expense_id?: SortOrder
    participant_id?: SortOrder
    part?: SortOrder
  }

  export type trip_participantCreateNestedManyWithoutTripInput = {
    create?: XOR<trip_participantCreateWithoutTripInput, trip_participantUncheckedCreateWithoutTripInput> | trip_participantCreateWithoutTripInput[] | trip_participantUncheckedCreateWithoutTripInput[]
    connectOrCreate?: trip_participantCreateOrConnectWithoutTripInput | trip_participantCreateOrConnectWithoutTripInput[]
    createMany?: trip_participantCreateManyTripInputEnvelope
    connect?: trip_participantWhereUniqueInput | trip_participantWhereUniqueInput[]
  }

  export type expenseCreateNestedManyWithoutTripInput = {
    create?: XOR<expenseCreateWithoutTripInput, expenseUncheckedCreateWithoutTripInput> | expenseCreateWithoutTripInput[] | expenseUncheckedCreateWithoutTripInput[]
    connectOrCreate?: expenseCreateOrConnectWithoutTripInput | expenseCreateOrConnectWithoutTripInput[]
    createMany?: expenseCreateManyTripInputEnvelope
    connect?: expenseWhereUniqueInput | expenseWhereUniqueInput[]
  }

  export type trip_participantUncheckedCreateNestedManyWithoutTripInput = {
    create?: XOR<trip_participantCreateWithoutTripInput, trip_participantUncheckedCreateWithoutTripInput> | trip_participantCreateWithoutTripInput[] | trip_participantUncheckedCreateWithoutTripInput[]
    connectOrCreate?: trip_participantCreateOrConnectWithoutTripInput | trip_participantCreateOrConnectWithoutTripInput[]
    createMany?: trip_participantCreateManyTripInputEnvelope
    connect?: trip_participantWhereUniqueInput | trip_participantWhereUniqueInput[]
  }

  export type expenseUncheckedCreateNestedManyWithoutTripInput = {
    create?: XOR<expenseCreateWithoutTripInput, expenseUncheckedCreateWithoutTripInput> | expenseCreateWithoutTripInput[] | expenseUncheckedCreateWithoutTripInput[]
    connectOrCreate?: expenseCreateOrConnectWithoutTripInput | expenseCreateOrConnectWithoutTripInput[]
    createMany?: expenseCreateManyTripInputEnvelope
    connect?: expenseWhereUniqueInput | expenseWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumTripStatusFieldUpdateOperationsInput = {
    set?: $Enums.TripStatus
  }

  export type trip_participantUpdateManyWithoutTripNestedInput = {
    create?: XOR<trip_participantCreateWithoutTripInput, trip_participantUncheckedCreateWithoutTripInput> | trip_participantCreateWithoutTripInput[] | trip_participantUncheckedCreateWithoutTripInput[]
    connectOrCreate?: trip_participantCreateOrConnectWithoutTripInput | trip_participantCreateOrConnectWithoutTripInput[]
    upsert?: trip_participantUpsertWithWhereUniqueWithoutTripInput | trip_participantUpsertWithWhereUniqueWithoutTripInput[]
    createMany?: trip_participantCreateManyTripInputEnvelope
    set?: trip_participantWhereUniqueInput | trip_participantWhereUniqueInput[]
    disconnect?: trip_participantWhereUniqueInput | trip_participantWhereUniqueInput[]
    delete?: trip_participantWhereUniqueInput | trip_participantWhereUniqueInput[]
    connect?: trip_participantWhereUniqueInput | trip_participantWhereUniqueInput[]
    update?: trip_participantUpdateWithWhereUniqueWithoutTripInput | trip_participantUpdateWithWhereUniqueWithoutTripInput[]
    updateMany?: trip_participantUpdateManyWithWhereWithoutTripInput | trip_participantUpdateManyWithWhereWithoutTripInput[]
    deleteMany?: trip_participantScalarWhereInput | trip_participantScalarWhereInput[]
  }

  export type expenseUpdateManyWithoutTripNestedInput = {
    create?: XOR<expenseCreateWithoutTripInput, expenseUncheckedCreateWithoutTripInput> | expenseCreateWithoutTripInput[] | expenseUncheckedCreateWithoutTripInput[]
    connectOrCreate?: expenseCreateOrConnectWithoutTripInput | expenseCreateOrConnectWithoutTripInput[]
    upsert?: expenseUpsertWithWhereUniqueWithoutTripInput | expenseUpsertWithWhereUniqueWithoutTripInput[]
    createMany?: expenseCreateManyTripInputEnvelope
    set?: expenseWhereUniqueInput | expenseWhereUniqueInput[]
    disconnect?: expenseWhereUniqueInput | expenseWhereUniqueInput[]
    delete?: expenseWhereUniqueInput | expenseWhereUniqueInput[]
    connect?: expenseWhereUniqueInput | expenseWhereUniqueInput[]
    update?: expenseUpdateWithWhereUniqueWithoutTripInput | expenseUpdateWithWhereUniqueWithoutTripInput[]
    updateMany?: expenseUpdateManyWithWhereWithoutTripInput | expenseUpdateManyWithWhereWithoutTripInput[]
    deleteMany?: expenseScalarWhereInput | expenseScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type trip_participantUncheckedUpdateManyWithoutTripNestedInput = {
    create?: XOR<trip_participantCreateWithoutTripInput, trip_participantUncheckedCreateWithoutTripInput> | trip_participantCreateWithoutTripInput[] | trip_participantUncheckedCreateWithoutTripInput[]
    connectOrCreate?: trip_participantCreateOrConnectWithoutTripInput | trip_participantCreateOrConnectWithoutTripInput[]
    upsert?: trip_participantUpsertWithWhereUniqueWithoutTripInput | trip_participantUpsertWithWhereUniqueWithoutTripInput[]
    createMany?: trip_participantCreateManyTripInputEnvelope
    set?: trip_participantWhereUniqueInput | trip_participantWhereUniqueInput[]
    disconnect?: trip_participantWhereUniqueInput | trip_participantWhereUniqueInput[]
    delete?: trip_participantWhereUniqueInput | trip_participantWhereUniqueInput[]
    connect?: trip_participantWhereUniqueInput | trip_participantWhereUniqueInput[]
    update?: trip_participantUpdateWithWhereUniqueWithoutTripInput | trip_participantUpdateWithWhereUniqueWithoutTripInput[]
    updateMany?: trip_participantUpdateManyWithWhereWithoutTripInput | trip_participantUpdateManyWithWhereWithoutTripInput[]
    deleteMany?: trip_participantScalarWhereInput | trip_participantScalarWhereInput[]
  }

  export type expenseUncheckedUpdateManyWithoutTripNestedInput = {
    create?: XOR<expenseCreateWithoutTripInput, expenseUncheckedCreateWithoutTripInput> | expenseCreateWithoutTripInput[] | expenseUncheckedCreateWithoutTripInput[]
    connectOrCreate?: expenseCreateOrConnectWithoutTripInput | expenseCreateOrConnectWithoutTripInput[]
    upsert?: expenseUpsertWithWhereUniqueWithoutTripInput | expenseUpsertWithWhereUniqueWithoutTripInput[]
    createMany?: expenseCreateManyTripInputEnvelope
    set?: expenseWhereUniqueInput | expenseWhereUniqueInput[]
    disconnect?: expenseWhereUniqueInput | expenseWhereUniqueInput[]
    delete?: expenseWhereUniqueInput | expenseWhereUniqueInput[]
    connect?: expenseWhereUniqueInput | expenseWhereUniqueInput[]
    update?: expenseUpdateWithWhereUniqueWithoutTripInput | expenseUpdateWithWhereUniqueWithoutTripInput[]
    updateMany?: expenseUpdateManyWithWhereWithoutTripInput | expenseUpdateManyWithWhereWithoutTripInput[]
    deleteMany?: expenseScalarWhereInput | expenseScalarWhereInput[]
  }

  export type trip_participantCreateNestedManyWithoutParticipantInput = {
    create?: XOR<trip_participantCreateWithoutParticipantInput, trip_participantUncheckedCreateWithoutParticipantInput> | trip_participantCreateWithoutParticipantInput[] | trip_participantUncheckedCreateWithoutParticipantInput[]
    connectOrCreate?: trip_participantCreateOrConnectWithoutParticipantInput | trip_participantCreateOrConnectWithoutParticipantInput[]
    createMany?: trip_participantCreateManyParticipantInputEnvelope
    connect?: trip_participantWhereUniqueInput | trip_participantWhereUniqueInput[]
  }

  export type participant_expenseCreateNestedManyWithoutParticipantInput = {
    create?: XOR<participant_expenseCreateWithoutParticipantInput, participant_expenseUncheckedCreateWithoutParticipantInput> | participant_expenseCreateWithoutParticipantInput[] | participant_expenseUncheckedCreateWithoutParticipantInput[]
    connectOrCreate?: participant_expenseCreateOrConnectWithoutParticipantInput | participant_expenseCreateOrConnectWithoutParticipantInput[]
    createMany?: participant_expenseCreateManyParticipantInputEnvelope
    connect?: participant_expenseWhereUniqueInput | participant_expenseWhereUniqueInput[]
  }

  export type trip_participantUncheckedCreateNestedManyWithoutParticipantInput = {
    create?: XOR<trip_participantCreateWithoutParticipantInput, trip_participantUncheckedCreateWithoutParticipantInput> | trip_participantCreateWithoutParticipantInput[] | trip_participantUncheckedCreateWithoutParticipantInput[]
    connectOrCreate?: trip_participantCreateOrConnectWithoutParticipantInput | trip_participantCreateOrConnectWithoutParticipantInput[]
    createMany?: trip_participantCreateManyParticipantInputEnvelope
    connect?: trip_participantWhereUniqueInput | trip_participantWhereUniqueInput[]
  }

  export type participant_expenseUncheckedCreateNestedManyWithoutParticipantInput = {
    create?: XOR<participant_expenseCreateWithoutParticipantInput, participant_expenseUncheckedCreateWithoutParticipantInput> | participant_expenseCreateWithoutParticipantInput[] | participant_expenseUncheckedCreateWithoutParticipantInput[]
    connectOrCreate?: participant_expenseCreateOrConnectWithoutParticipantInput | participant_expenseCreateOrConnectWithoutParticipantInput[]
    createMany?: participant_expenseCreateManyParticipantInputEnvelope
    connect?: participant_expenseWhereUniqueInput | participant_expenseWhereUniqueInput[]
  }

  export type trip_participantUpdateManyWithoutParticipantNestedInput = {
    create?: XOR<trip_participantCreateWithoutParticipantInput, trip_participantUncheckedCreateWithoutParticipantInput> | trip_participantCreateWithoutParticipantInput[] | trip_participantUncheckedCreateWithoutParticipantInput[]
    connectOrCreate?: trip_participantCreateOrConnectWithoutParticipantInput | trip_participantCreateOrConnectWithoutParticipantInput[]
    upsert?: trip_participantUpsertWithWhereUniqueWithoutParticipantInput | trip_participantUpsertWithWhereUniqueWithoutParticipantInput[]
    createMany?: trip_participantCreateManyParticipantInputEnvelope
    set?: trip_participantWhereUniqueInput | trip_participantWhereUniqueInput[]
    disconnect?: trip_participantWhereUniqueInput | trip_participantWhereUniqueInput[]
    delete?: trip_participantWhereUniqueInput | trip_participantWhereUniqueInput[]
    connect?: trip_participantWhereUniqueInput | trip_participantWhereUniqueInput[]
    update?: trip_participantUpdateWithWhereUniqueWithoutParticipantInput | trip_participantUpdateWithWhereUniqueWithoutParticipantInput[]
    updateMany?: trip_participantUpdateManyWithWhereWithoutParticipantInput | trip_participantUpdateManyWithWhereWithoutParticipantInput[]
    deleteMany?: trip_participantScalarWhereInput | trip_participantScalarWhereInput[]
  }

  export type participant_expenseUpdateManyWithoutParticipantNestedInput = {
    create?: XOR<participant_expenseCreateWithoutParticipantInput, participant_expenseUncheckedCreateWithoutParticipantInput> | participant_expenseCreateWithoutParticipantInput[] | participant_expenseUncheckedCreateWithoutParticipantInput[]
    connectOrCreate?: participant_expenseCreateOrConnectWithoutParticipantInput | participant_expenseCreateOrConnectWithoutParticipantInput[]
    upsert?: participant_expenseUpsertWithWhereUniqueWithoutParticipantInput | participant_expenseUpsertWithWhereUniqueWithoutParticipantInput[]
    createMany?: participant_expenseCreateManyParticipantInputEnvelope
    set?: participant_expenseWhereUniqueInput | participant_expenseWhereUniqueInput[]
    disconnect?: participant_expenseWhereUniqueInput | participant_expenseWhereUniqueInput[]
    delete?: participant_expenseWhereUniqueInput | participant_expenseWhereUniqueInput[]
    connect?: participant_expenseWhereUniqueInput | participant_expenseWhereUniqueInput[]
    update?: participant_expenseUpdateWithWhereUniqueWithoutParticipantInput | participant_expenseUpdateWithWhereUniqueWithoutParticipantInput[]
    updateMany?: participant_expenseUpdateManyWithWhereWithoutParticipantInput | participant_expenseUpdateManyWithWhereWithoutParticipantInput[]
    deleteMany?: participant_expenseScalarWhereInput | participant_expenseScalarWhereInput[]
  }

  export type trip_participantUncheckedUpdateManyWithoutParticipantNestedInput = {
    create?: XOR<trip_participantCreateWithoutParticipantInput, trip_participantUncheckedCreateWithoutParticipantInput> | trip_participantCreateWithoutParticipantInput[] | trip_participantUncheckedCreateWithoutParticipantInput[]
    connectOrCreate?: trip_participantCreateOrConnectWithoutParticipantInput | trip_participantCreateOrConnectWithoutParticipantInput[]
    upsert?: trip_participantUpsertWithWhereUniqueWithoutParticipantInput | trip_participantUpsertWithWhereUniqueWithoutParticipantInput[]
    createMany?: trip_participantCreateManyParticipantInputEnvelope
    set?: trip_participantWhereUniqueInput | trip_participantWhereUniqueInput[]
    disconnect?: trip_participantWhereUniqueInput | trip_participantWhereUniqueInput[]
    delete?: trip_participantWhereUniqueInput | trip_participantWhereUniqueInput[]
    connect?: trip_participantWhereUniqueInput | trip_participantWhereUniqueInput[]
    update?: trip_participantUpdateWithWhereUniqueWithoutParticipantInput | trip_participantUpdateWithWhereUniqueWithoutParticipantInput[]
    updateMany?: trip_participantUpdateManyWithWhereWithoutParticipantInput | trip_participantUpdateManyWithWhereWithoutParticipantInput[]
    deleteMany?: trip_participantScalarWhereInput | trip_participantScalarWhereInput[]
  }

  export type participant_expenseUncheckedUpdateManyWithoutParticipantNestedInput = {
    create?: XOR<participant_expenseCreateWithoutParticipantInput, participant_expenseUncheckedCreateWithoutParticipantInput> | participant_expenseCreateWithoutParticipantInput[] | participant_expenseUncheckedCreateWithoutParticipantInput[]
    connectOrCreate?: participant_expenseCreateOrConnectWithoutParticipantInput | participant_expenseCreateOrConnectWithoutParticipantInput[]
    upsert?: participant_expenseUpsertWithWhereUniqueWithoutParticipantInput | participant_expenseUpsertWithWhereUniqueWithoutParticipantInput[]
    createMany?: participant_expenseCreateManyParticipantInputEnvelope
    set?: participant_expenseWhereUniqueInput | participant_expenseWhereUniqueInput[]
    disconnect?: participant_expenseWhereUniqueInput | participant_expenseWhereUniqueInput[]
    delete?: participant_expenseWhereUniqueInput | participant_expenseWhereUniqueInput[]
    connect?: participant_expenseWhereUniqueInput | participant_expenseWhereUniqueInput[]
    update?: participant_expenseUpdateWithWhereUniqueWithoutParticipantInput | participant_expenseUpdateWithWhereUniqueWithoutParticipantInput[]
    updateMany?: participant_expenseUpdateManyWithWhereWithoutParticipantInput | participant_expenseUpdateManyWithWhereWithoutParticipantInput[]
    deleteMany?: participant_expenseScalarWhereInput | participant_expenseScalarWhereInput[]
  }

  export type tripCreateNestedOneWithoutParticipantsInput = {
    create?: XOR<tripCreateWithoutParticipantsInput, tripUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: tripCreateOrConnectWithoutParticipantsInput
    connect?: tripWhereUniqueInput
  }

  export type participantCreateNestedOneWithoutTripsInput = {
    create?: XOR<participantCreateWithoutTripsInput, participantUncheckedCreateWithoutTripsInput>
    connectOrCreate?: participantCreateOrConnectWithoutTripsInput
    connect?: participantWhereUniqueInput
  }

  export type tripUpdateOneRequiredWithoutParticipantsNestedInput = {
    create?: XOR<tripCreateWithoutParticipantsInput, tripUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: tripCreateOrConnectWithoutParticipantsInput
    upsert?: tripUpsertWithoutParticipantsInput
    connect?: tripWhereUniqueInput
    update?: XOR<XOR<tripUpdateToOneWithWhereWithoutParticipantsInput, tripUpdateWithoutParticipantsInput>, tripUncheckedUpdateWithoutParticipantsInput>
  }

  export type participantUpdateOneRequiredWithoutTripsNestedInput = {
    create?: XOR<participantCreateWithoutTripsInput, participantUncheckedCreateWithoutTripsInput>
    connectOrCreate?: participantCreateOrConnectWithoutTripsInput
    upsert?: participantUpsertWithoutTripsInput
    connect?: participantWhereUniqueInput
    update?: XOR<XOR<participantUpdateToOneWithWhereWithoutTripsInput, participantUpdateWithoutTripsInput>, participantUncheckedUpdateWithoutTripsInput>
  }

  export type tripCreateNestedOneWithoutExpensesInput = {
    create?: XOR<tripCreateWithoutExpensesInput, tripUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: tripCreateOrConnectWithoutExpensesInput
    connect?: tripWhereUniqueInput
  }

  export type participant_expenseCreateNestedManyWithoutExpenseInput = {
    create?: XOR<participant_expenseCreateWithoutExpenseInput, participant_expenseUncheckedCreateWithoutExpenseInput> | participant_expenseCreateWithoutExpenseInput[] | participant_expenseUncheckedCreateWithoutExpenseInput[]
    connectOrCreate?: participant_expenseCreateOrConnectWithoutExpenseInput | participant_expenseCreateOrConnectWithoutExpenseInput[]
    createMany?: participant_expenseCreateManyExpenseInputEnvelope
    connect?: participant_expenseWhereUniqueInput | participant_expenseWhereUniqueInput[]
  }

  export type participant_expenseUncheckedCreateNestedManyWithoutExpenseInput = {
    create?: XOR<participant_expenseCreateWithoutExpenseInput, participant_expenseUncheckedCreateWithoutExpenseInput> | participant_expenseCreateWithoutExpenseInput[] | participant_expenseUncheckedCreateWithoutExpenseInput[]
    connectOrCreate?: participant_expenseCreateOrConnectWithoutExpenseInput | participant_expenseCreateOrConnectWithoutExpenseInput[]
    createMany?: participant_expenseCreateManyExpenseInputEnvelope
    connect?: participant_expenseWhereUniqueInput | participant_expenseWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type tripUpdateOneRequiredWithoutExpensesNestedInput = {
    create?: XOR<tripCreateWithoutExpensesInput, tripUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: tripCreateOrConnectWithoutExpensesInput
    upsert?: tripUpsertWithoutExpensesInput
    connect?: tripWhereUniqueInput
    update?: XOR<XOR<tripUpdateToOneWithWhereWithoutExpensesInput, tripUpdateWithoutExpensesInput>, tripUncheckedUpdateWithoutExpensesInput>
  }

  export type participant_expenseUpdateManyWithoutExpenseNestedInput = {
    create?: XOR<participant_expenseCreateWithoutExpenseInput, participant_expenseUncheckedCreateWithoutExpenseInput> | participant_expenseCreateWithoutExpenseInput[] | participant_expenseUncheckedCreateWithoutExpenseInput[]
    connectOrCreate?: participant_expenseCreateOrConnectWithoutExpenseInput | participant_expenseCreateOrConnectWithoutExpenseInput[]
    upsert?: participant_expenseUpsertWithWhereUniqueWithoutExpenseInput | participant_expenseUpsertWithWhereUniqueWithoutExpenseInput[]
    createMany?: participant_expenseCreateManyExpenseInputEnvelope
    set?: participant_expenseWhereUniqueInput | participant_expenseWhereUniqueInput[]
    disconnect?: participant_expenseWhereUniqueInput | participant_expenseWhereUniqueInput[]
    delete?: participant_expenseWhereUniqueInput | participant_expenseWhereUniqueInput[]
    connect?: participant_expenseWhereUniqueInput | participant_expenseWhereUniqueInput[]
    update?: participant_expenseUpdateWithWhereUniqueWithoutExpenseInput | participant_expenseUpdateWithWhereUniqueWithoutExpenseInput[]
    updateMany?: participant_expenseUpdateManyWithWhereWithoutExpenseInput | participant_expenseUpdateManyWithWhereWithoutExpenseInput[]
    deleteMany?: participant_expenseScalarWhereInput | participant_expenseScalarWhereInput[]
  }

  export type participant_expenseUncheckedUpdateManyWithoutExpenseNestedInput = {
    create?: XOR<participant_expenseCreateWithoutExpenseInput, participant_expenseUncheckedCreateWithoutExpenseInput> | participant_expenseCreateWithoutExpenseInput[] | participant_expenseUncheckedCreateWithoutExpenseInput[]
    connectOrCreate?: participant_expenseCreateOrConnectWithoutExpenseInput | participant_expenseCreateOrConnectWithoutExpenseInput[]
    upsert?: participant_expenseUpsertWithWhereUniqueWithoutExpenseInput | participant_expenseUpsertWithWhereUniqueWithoutExpenseInput[]
    createMany?: participant_expenseCreateManyExpenseInputEnvelope
    set?: participant_expenseWhereUniqueInput | participant_expenseWhereUniqueInput[]
    disconnect?: participant_expenseWhereUniqueInput | participant_expenseWhereUniqueInput[]
    delete?: participant_expenseWhereUniqueInput | participant_expenseWhereUniqueInput[]
    connect?: participant_expenseWhereUniqueInput | participant_expenseWhereUniqueInput[]
    update?: participant_expenseUpdateWithWhereUniqueWithoutExpenseInput | participant_expenseUpdateWithWhereUniqueWithoutExpenseInput[]
    updateMany?: participant_expenseUpdateManyWithWhereWithoutExpenseInput | participant_expenseUpdateManyWithWhereWithoutExpenseInput[]
    deleteMany?: participant_expenseScalarWhereInput | participant_expenseScalarWhereInput[]
  }

  export type expenseCreateNestedOneWithoutParticipant_expencesInput = {
    create?: XOR<expenseCreateWithoutParticipant_expencesInput, expenseUncheckedCreateWithoutParticipant_expencesInput>
    connectOrCreate?: expenseCreateOrConnectWithoutParticipant_expencesInput
    connect?: expenseWhereUniqueInput
  }

  export type participantCreateNestedOneWithoutParticipant_expencesInput = {
    create?: XOR<participantCreateWithoutParticipant_expencesInput, participantUncheckedCreateWithoutParticipant_expencesInput>
    connectOrCreate?: participantCreateOrConnectWithoutParticipant_expencesInput
    connect?: participantWhereUniqueInput
  }

  export type expenseUpdateOneRequiredWithoutParticipant_expencesNestedInput = {
    create?: XOR<expenseCreateWithoutParticipant_expencesInput, expenseUncheckedCreateWithoutParticipant_expencesInput>
    connectOrCreate?: expenseCreateOrConnectWithoutParticipant_expencesInput
    upsert?: expenseUpsertWithoutParticipant_expencesInput
    connect?: expenseWhereUniqueInput
    update?: XOR<XOR<expenseUpdateToOneWithWhereWithoutParticipant_expencesInput, expenseUpdateWithoutParticipant_expencesInput>, expenseUncheckedUpdateWithoutParticipant_expencesInput>
  }

  export type participantUpdateOneRequiredWithoutParticipant_expencesNestedInput = {
    create?: XOR<participantCreateWithoutParticipant_expencesInput, participantUncheckedCreateWithoutParticipant_expencesInput>
    connectOrCreate?: participantCreateOrConnectWithoutParticipant_expencesInput
    upsert?: participantUpsertWithoutParticipant_expencesInput
    connect?: participantWhereUniqueInput
    update?: XOR<XOR<participantUpdateToOneWithWhereWithoutParticipant_expencesInput, participantUpdateWithoutParticipant_expencesInput>, participantUncheckedUpdateWithoutParticipant_expencesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumTripStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TripStatus | EnumTripStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TripStatus[] | ListEnumTripStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TripStatus[] | ListEnumTripStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTripStatusFilter<$PrismaModel> | $Enums.TripStatus
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumTripStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TripStatus | EnumTripStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TripStatus[] | ListEnumTripStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TripStatus[] | ListEnumTripStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTripStatusWithAggregatesFilter<$PrismaModel> | $Enums.TripStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTripStatusFilter<$PrismaModel>
    _max?: NestedEnumTripStatusFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type trip_participantCreateWithoutTripInput = {
    participant: participantCreateNestedOneWithoutTripsInput
  }

  export type trip_participantUncheckedCreateWithoutTripInput = {
    participant_id: number
  }

  export type trip_participantCreateOrConnectWithoutTripInput = {
    where: trip_participantWhereUniqueInput
    create: XOR<trip_participantCreateWithoutTripInput, trip_participantUncheckedCreateWithoutTripInput>
  }

  export type trip_participantCreateManyTripInputEnvelope = {
    data: trip_participantCreateManyTripInput | trip_participantCreateManyTripInput[]
    skipDuplicates?: boolean
  }

  export type expenseCreateWithoutTripInput = {
    name: string
    sum: number
    is_settled?: boolean
    participant_expences?: participant_expenseCreateNestedManyWithoutExpenseInput
  }

  export type expenseUncheckedCreateWithoutTripInput = {
    expense_id?: number
    name: string
    sum: number
    is_settled?: boolean
    participant_expences?: participant_expenseUncheckedCreateNestedManyWithoutExpenseInput
  }

  export type expenseCreateOrConnectWithoutTripInput = {
    where: expenseWhereUniqueInput
    create: XOR<expenseCreateWithoutTripInput, expenseUncheckedCreateWithoutTripInput>
  }

  export type expenseCreateManyTripInputEnvelope = {
    data: expenseCreateManyTripInput | expenseCreateManyTripInput[]
    skipDuplicates?: boolean
  }

  export type trip_participantUpsertWithWhereUniqueWithoutTripInput = {
    where: trip_participantWhereUniqueInput
    update: XOR<trip_participantUpdateWithoutTripInput, trip_participantUncheckedUpdateWithoutTripInput>
    create: XOR<trip_participantCreateWithoutTripInput, trip_participantUncheckedCreateWithoutTripInput>
  }

  export type trip_participantUpdateWithWhereUniqueWithoutTripInput = {
    where: trip_participantWhereUniqueInput
    data: XOR<trip_participantUpdateWithoutTripInput, trip_participantUncheckedUpdateWithoutTripInput>
  }

  export type trip_participantUpdateManyWithWhereWithoutTripInput = {
    where: trip_participantScalarWhereInput
    data: XOR<trip_participantUpdateManyMutationInput, trip_participantUncheckedUpdateManyWithoutTripInput>
  }

  export type trip_participantScalarWhereInput = {
    AND?: trip_participantScalarWhereInput | trip_participantScalarWhereInput[]
    OR?: trip_participantScalarWhereInput[]
    NOT?: trip_participantScalarWhereInput | trip_participantScalarWhereInput[]
    trip_id?: IntFilter<"trip_participant"> | number
    participant_id?: IntFilter<"trip_participant"> | number
  }

  export type expenseUpsertWithWhereUniqueWithoutTripInput = {
    where: expenseWhereUniqueInput
    update: XOR<expenseUpdateWithoutTripInput, expenseUncheckedUpdateWithoutTripInput>
    create: XOR<expenseCreateWithoutTripInput, expenseUncheckedCreateWithoutTripInput>
  }

  export type expenseUpdateWithWhereUniqueWithoutTripInput = {
    where: expenseWhereUniqueInput
    data: XOR<expenseUpdateWithoutTripInput, expenseUncheckedUpdateWithoutTripInput>
  }

  export type expenseUpdateManyWithWhereWithoutTripInput = {
    where: expenseScalarWhereInput
    data: XOR<expenseUpdateManyMutationInput, expenseUncheckedUpdateManyWithoutTripInput>
  }

  export type expenseScalarWhereInput = {
    AND?: expenseScalarWhereInput | expenseScalarWhereInput[]
    OR?: expenseScalarWhereInput[]
    NOT?: expenseScalarWhereInput | expenseScalarWhereInput[]
    expense_id?: IntFilter<"expense"> | number
    name?: StringFilter<"expense"> | string
    trip_id?: IntFilter<"expense"> | number
    sum?: FloatFilter<"expense"> | number
    is_settled?: BoolFilter<"expense"> | boolean
  }

  export type trip_participantCreateWithoutParticipantInput = {
    trip: tripCreateNestedOneWithoutParticipantsInput
  }

  export type trip_participantUncheckedCreateWithoutParticipantInput = {
    trip_id: number
  }

  export type trip_participantCreateOrConnectWithoutParticipantInput = {
    where: trip_participantWhereUniqueInput
    create: XOR<trip_participantCreateWithoutParticipantInput, trip_participantUncheckedCreateWithoutParticipantInput>
  }

  export type trip_participantCreateManyParticipantInputEnvelope = {
    data: trip_participantCreateManyParticipantInput | trip_participantCreateManyParticipantInput[]
    skipDuplicates?: boolean
  }

  export type participant_expenseCreateWithoutParticipantInput = {
    part: number
    expense: expenseCreateNestedOneWithoutParticipant_expencesInput
  }

  export type participant_expenseUncheckedCreateWithoutParticipantInput = {
    expense_id: number
    part: number
  }

  export type participant_expenseCreateOrConnectWithoutParticipantInput = {
    where: participant_expenseWhereUniqueInput
    create: XOR<participant_expenseCreateWithoutParticipantInput, participant_expenseUncheckedCreateWithoutParticipantInput>
  }

  export type participant_expenseCreateManyParticipantInputEnvelope = {
    data: participant_expenseCreateManyParticipantInput | participant_expenseCreateManyParticipantInput[]
    skipDuplicates?: boolean
  }

  export type trip_participantUpsertWithWhereUniqueWithoutParticipantInput = {
    where: trip_participantWhereUniqueInput
    update: XOR<trip_participantUpdateWithoutParticipantInput, trip_participantUncheckedUpdateWithoutParticipantInput>
    create: XOR<trip_participantCreateWithoutParticipantInput, trip_participantUncheckedCreateWithoutParticipantInput>
  }

  export type trip_participantUpdateWithWhereUniqueWithoutParticipantInput = {
    where: trip_participantWhereUniqueInput
    data: XOR<trip_participantUpdateWithoutParticipantInput, trip_participantUncheckedUpdateWithoutParticipantInput>
  }

  export type trip_participantUpdateManyWithWhereWithoutParticipantInput = {
    where: trip_participantScalarWhereInput
    data: XOR<trip_participantUpdateManyMutationInput, trip_participantUncheckedUpdateManyWithoutParticipantInput>
  }

  export type participant_expenseUpsertWithWhereUniqueWithoutParticipantInput = {
    where: participant_expenseWhereUniqueInput
    update: XOR<participant_expenseUpdateWithoutParticipantInput, participant_expenseUncheckedUpdateWithoutParticipantInput>
    create: XOR<participant_expenseCreateWithoutParticipantInput, participant_expenseUncheckedCreateWithoutParticipantInput>
  }

  export type participant_expenseUpdateWithWhereUniqueWithoutParticipantInput = {
    where: participant_expenseWhereUniqueInput
    data: XOR<participant_expenseUpdateWithoutParticipantInput, participant_expenseUncheckedUpdateWithoutParticipantInput>
  }

  export type participant_expenseUpdateManyWithWhereWithoutParticipantInput = {
    where: participant_expenseScalarWhereInput
    data: XOR<participant_expenseUpdateManyMutationInput, participant_expenseUncheckedUpdateManyWithoutParticipantInput>
  }

  export type participant_expenseScalarWhereInput = {
    AND?: participant_expenseScalarWhereInput | participant_expenseScalarWhereInput[]
    OR?: participant_expenseScalarWhereInput[]
    NOT?: participant_expenseScalarWhereInput | participant_expenseScalarWhereInput[]
    expense_id?: IntFilter<"participant_expense"> | number
    participant_id?: IntFilter<"participant_expense"> | number
    part?: FloatFilter<"participant_expense"> | number
  }

  export type tripCreateWithoutParticipantsInput = {
    name: string
    start: Date | string
    end: Date | string
    status?: $Enums.TripStatus
    expenses?: expenseCreateNestedManyWithoutTripInput
  }

  export type tripUncheckedCreateWithoutParticipantsInput = {
    trip_id?: number
    name: string
    start: Date | string
    end: Date | string
    status?: $Enums.TripStatus
    expenses?: expenseUncheckedCreateNestedManyWithoutTripInput
  }

  export type tripCreateOrConnectWithoutParticipantsInput = {
    where: tripWhereUniqueInput
    create: XOR<tripCreateWithoutParticipantsInput, tripUncheckedCreateWithoutParticipantsInput>
  }

  export type participantCreateWithoutTripsInput = {
    name: string
    email: string
    participant_expences?: participant_expenseCreateNestedManyWithoutParticipantInput
  }

  export type participantUncheckedCreateWithoutTripsInput = {
    participant_id?: number
    name: string
    email: string
    participant_expences?: participant_expenseUncheckedCreateNestedManyWithoutParticipantInput
  }

  export type participantCreateOrConnectWithoutTripsInput = {
    where: participantWhereUniqueInput
    create: XOR<participantCreateWithoutTripsInput, participantUncheckedCreateWithoutTripsInput>
  }

  export type tripUpsertWithoutParticipantsInput = {
    update: XOR<tripUpdateWithoutParticipantsInput, tripUncheckedUpdateWithoutParticipantsInput>
    create: XOR<tripCreateWithoutParticipantsInput, tripUncheckedCreateWithoutParticipantsInput>
    where?: tripWhereInput
  }

  export type tripUpdateToOneWithWhereWithoutParticipantsInput = {
    where?: tripWhereInput
    data: XOR<tripUpdateWithoutParticipantsInput, tripUncheckedUpdateWithoutParticipantsInput>
  }

  export type tripUpdateWithoutParticipantsInput = {
    name?: StringFieldUpdateOperationsInput | string
    start?: DateTimeFieldUpdateOperationsInput | Date | string
    end?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    expenses?: expenseUpdateManyWithoutTripNestedInput
  }

  export type tripUncheckedUpdateWithoutParticipantsInput = {
    trip_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    start?: DateTimeFieldUpdateOperationsInput | Date | string
    end?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    expenses?: expenseUncheckedUpdateManyWithoutTripNestedInput
  }

  export type participantUpsertWithoutTripsInput = {
    update: XOR<participantUpdateWithoutTripsInput, participantUncheckedUpdateWithoutTripsInput>
    create: XOR<participantCreateWithoutTripsInput, participantUncheckedCreateWithoutTripsInput>
    where?: participantWhereInput
  }

  export type participantUpdateToOneWithWhereWithoutTripsInput = {
    where?: participantWhereInput
    data: XOR<participantUpdateWithoutTripsInput, participantUncheckedUpdateWithoutTripsInput>
  }

  export type participantUpdateWithoutTripsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    participant_expences?: participant_expenseUpdateManyWithoutParticipantNestedInput
  }

  export type participantUncheckedUpdateWithoutTripsInput = {
    participant_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    participant_expences?: participant_expenseUncheckedUpdateManyWithoutParticipantNestedInput
  }

  export type tripCreateWithoutExpensesInput = {
    name: string
    start: Date | string
    end: Date | string
    status?: $Enums.TripStatus
    participants?: trip_participantCreateNestedManyWithoutTripInput
  }

  export type tripUncheckedCreateWithoutExpensesInput = {
    trip_id?: number
    name: string
    start: Date | string
    end: Date | string
    status?: $Enums.TripStatus
    participants?: trip_participantUncheckedCreateNestedManyWithoutTripInput
  }

  export type tripCreateOrConnectWithoutExpensesInput = {
    where: tripWhereUniqueInput
    create: XOR<tripCreateWithoutExpensesInput, tripUncheckedCreateWithoutExpensesInput>
  }

  export type participant_expenseCreateWithoutExpenseInput = {
    part: number
    participant: participantCreateNestedOneWithoutParticipant_expencesInput
  }

  export type participant_expenseUncheckedCreateWithoutExpenseInput = {
    participant_id: number
    part: number
  }

  export type participant_expenseCreateOrConnectWithoutExpenseInput = {
    where: participant_expenseWhereUniqueInput
    create: XOR<participant_expenseCreateWithoutExpenseInput, participant_expenseUncheckedCreateWithoutExpenseInput>
  }

  export type participant_expenseCreateManyExpenseInputEnvelope = {
    data: participant_expenseCreateManyExpenseInput | participant_expenseCreateManyExpenseInput[]
    skipDuplicates?: boolean
  }

  export type tripUpsertWithoutExpensesInput = {
    update: XOR<tripUpdateWithoutExpensesInput, tripUncheckedUpdateWithoutExpensesInput>
    create: XOR<tripCreateWithoutExpensesInput, tripUncheckedCreateWithoutExpensesInput>
    where?: tripWhereInput
  }

  export type tripUpdateToOneWithWhereWithoutExpensesInput = {
    where?: tripWhereInput
    data: XOR<tripUpdateWithoutExpensesInput, tripUncheckedUpdateWithoutExpensesInput>
  }

  export type tripUpdateWithoutExpensesInput = {
    name?: StringFieldUpdateOperationsInput | string
    start?: DateTimeFieldUpdateOperationsInput | Date | string
    end?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    participants?: trip_participantUpdateManyWithoutTripNestedInput
  }

  export type tripUncheckedUpdateWithoutExpensesInput = {
    trip_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    start?: DateTimeFieldUpdateOperationsInput | Date | string
    end?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumTripStatusFieldUpdateOperationsInput | $Enums.TripStatus
    participants?: trip_participantUncheckedUpdateManyWithoutTripNestedInput
  }

  export type participant_expenseUpsertWithWhereUniqueWithoutExpenseInput = {
    where: participant_expenseWhereUniqueInput
    update: XOR<participant_expenseUpdateWithoutExpenseInput, participant_expenseUncheckedUpdateWithoutExpenseInput>
    create: XOR<participant_expenseCreateWithoutExpenseInput, participant_expenseUncheckedCreateWithoutExpenseInput>
  }

  export type participant_expenseUpdateWithWhereUniqueWithoutExpenseInput = {
    where: participant_expenseWhereUniqueInput
    data: XOR<participant_expenseUpdateWithoutExpenseInput, participant_expenseUncheckedUpdateWithoutExpenseInput>
  }

  export type participant_expenseUpdateManyWithWhereWithoutExpenseInput = {
    where: participant_expenseScalarWhereInput
    data: XOR<participant_expenseUpdateManyMutationInput, participant_expenseUncheckedUpdateManyWithoutExpenseInput>
  }

  export type expenseCreateWithoutParticipant_expencesInput = {
    name: string
    sum: number
    is_settled?: boolean
    trip: tripCreateNestedOneWithoutExpensesInput
  }

  export type expenseUncheckedCreateWithoutParticipant_expencesInput = {
    expense_id?: number
    name: string
    trip_id: number
    sum: number
    is_settled?: boolean
  }

  export type expenseCreateOrConnectWithoutParticipant_expencesInput = {
    where: expenseWhereUniqueInput
    create: XOR<expenseCreateWithoutParticipant_expencesInput, expenseUncheckedCreateWithoutParticipant_expencesInput>
  }

  export type participantCreateWithoutParticipant_expencesInput = {
    name: string
    email: string
    trips?: trip_participantCreateNestedManyWithoutParticipantInput
  }

  export type participantUncheckedCreateWithoutParticipant_expencesInput = {
    participant_id?: number
    name: string
    email: string
    trips?: trip_participantUncheckedCreateNestedManyWithoutParticipantInput
  }

  export type participantCreateOrConnectWithoutParticipant_expencesInput = {
    where: participantWhereUniqueInput
    create: XOR<participantCreateWithoutParticipant_expencesInput, participantUncheckedCreateWithoutParticipant_expencesInput>
  }

  export type expenseUpsertWithoutParticipant_expencesInput = {
    update: XOR<expenseUpdateWithoutParticipant_expencesInput, expenseUncheckedUpdateWithoutParticipant_expencesInput>
    create: XOR<expenseCreateWithoutParticipant_expencesInput, expenseUncheckedCreateWithoutParticipant_expencesInput>
    where?: expenseWhereInput
  }

  export type expenseUpdateToOneWithWhereWithoutParticipant_expencesInput = {
    where?: expenseWhereInput
    data: XOR<expenseUpdateWithoutParticipant_expencesInput, expenseUncheckedUpdateWithoutParticipant_expencesInput>
  }

  export type expenseUpdateWithoutParticipant_expencesInput = {
    name?: StringFieldUpdateOperationsInput | string
    sum?: FloatFieldUpdateOperationsInput | number
    is_settled?: BoolFieldUpdateOperationsInput | boolean
    trip?: tripUpdateOneRequiredWithoutExpensesNestedInput
  }

  export type expenseUncheckedUpdateWithoutParticipant_expencesInput = {
    expense_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    trip_id?: IntFieldUpdateOperationsInput | number
    sum?: FloatFieldUpdateOperationsInput | number
    is_settled?: BoolFieldUpdateOperationsInput | boolean
  }

  export type participantUpsertWithoutParticipant_expencesInput = {
    update: XOR<participantUpdateWithoutParticipant_expencesInput, participantUncheckedUpdateWithoutParticipant_expencesInput>
    create: XOR<participantCreateWithoutParticipant_expencesInput, participantUncheckedCreateWithoutParticipant_expencesInput>
    where?: participantWhereInput
  }

  export type participantUpdateToOneWithWhereWithoutParticipant_expencesInput = {
    where?: participantWhereInput
    data: XOR<participantUpdateWithoutParticipant_expencesInput, participantUncheckedUpdateWithoutParticipant_expencesInput>
  }

  export type participantUpdateWithoutParticipant_expencesInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    trips?: trip_participantUpdateManyWithoutParticipantNestedInput
  }

  export type participantUncheckedUpdateWithoutParticipant_expencesInput = {
    participant_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    trips?: trip_participantUncheckedUpdateManyWithoutParticipantNestedInput
  }

  export type trip_participantCreateManyTripInput = {
    participant_id: number
  }

  export type expenseCreateManyTripInput = {
    expense_id?: number
    name: string
    sum: number
    is_settled?: boolean
  }

  export type trip_participantUpdateWithoutTripInput = {
    participant?: participantUpdateOneRequiredWithoutTripsNestedInput
  }

  export type trip_participantUncheckedUpdateWithoutTripInput = {
    participant_id?: IntFieldUpdateOperationsInput | number
  }

  export type trip_participantUncheckedUpdateManyWithoutTripInput = {
    participant_id?: IntFieldUpdateOperationsInput | number
  }

  export type expenseUpdateWithoutTripInput = {
    name?: StringFieldUpdateOperationsInput | string
    sum?: FloatFieldUpdateOperationsInput | number
    is_settled?: BoolFieldUpdateOperationsInput | boolean
    participant_expences?: participant_expenseUpdateManyWithoutExpenseNestedInput
  }

  export type expenseUncheckedUpdateWithoutTripInput = {
    expense_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    sum?: FloatFieldUpdateOperationsInput | number
    is_settled?: BoolFieldUpdateOperationsInput | boolean
    participant_expences?: participant_expenseUncheckedUpdateManyWithoutExpenseNestedInput
  }

  export type expenseUncheckedUpdateManyWithoutTripInput = {
    expense_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    sum?: FloatFieldUpdateOperationsInput | number
    is_settled?: BoolFieldUpdateOperationsInput | boolean
  }

  export type trip_participantCreateManyParticipantInput = {
    trip_id: number
  }

  export type participant_expenseCreateManyParticipantInput = {
    expense_id: number
    part: number
  }

  export type trip_participantUpdateWithoutParticipantInput = {
    trip?: tripUpdateOneRequiredWithoutParticipantsNestedInput
  }

  export type trip_participantUncheckedUpdateWithoutParticipantInput = {
    trip_id?: IntFieldUpdateOperationsInput | number
  }

  export type trip_participantUncheckedUpdateManyWithoutParticipantInput = {
    trip_id?: IntFieldUpdateOperationsInput | number
  }

  export type participant_expenseUpdateWithoutParticipantInput = {
    part?: FloatFieldUpdateOperationsInput | number
    expense?: expenseUpdateOneRequiredWithoutParticipant_expencesNestedInput
  }

  export type participant_expenseUncheckedUpdateWithoutParticipantInput = {
    expense_id?: IntFieldUpdateOperationsInput | number
    part?: FloatFieldUpdateOperationsInput | number
  }

  export type participant_expenseUncheckedUpdateManyWithoutParticipantInput = {
    expense_id?: IntFieldUpdateOperationsInput | number
    part?: FloatFieldUpdateOperationsInput | number
  }

  export type participant_expenseCreateManyExpenseInput = {
    participant_id: number
    part: number
  }

  export type participant_expenseUpdateWithoutExpenseInput = {
    part?: FloatFieldUpdateOperationsInput | number
    participant?: participantUpdateOneRequiredWithoutParticipant_expencesNestedInput
  }

  export type participant_expenseUncheckedUpdateWithoutExpenseInput = {
    participant_id?: IntFieldUpdateOperationsInput | number
    part?: FloatFieldUpdateOperationsInput | number
  }

  export type participant_expenseUncheckedUpdateManyWithoutExpenseInput = {
    participant_id?: IntFieldUpdateOperationsInput | number
    part?: FloatFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}