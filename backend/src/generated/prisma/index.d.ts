
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
 * Model Tenant
 * 
 */
export type Tenant = $Result.DefaultSelection<Prisma.$TenantPayload>
/**
 * Model Usuario
 * 
 */
export type Usuario = $Result.DefaultSelection<Prisma.$UsuarioPayload>
/**
 * Model Profissional
 * 
 */
export type Profissional = $Result.DefaultSelection<Prisma.$ProfissionalPayload>
/**
 * Model Paciente
 * 
 */
export type Paciente = $Result.DefaultSelection<Prisma.$PacientePayload>
/**
 * Model Procedimento
 * 
 */
export type Procedimento = $Result.DefaultSelection<Prisma.$ProcedimentoPayload>
/**
 * Model Agendamento
 * 
 */
export type Agendamento = $Result.DefaultSelection<Prisma.$AgendamentoPayload>
/**
 * Model Atendimento
 * 
 */
export type Atendimento = $Result.DefaultSelection<Prisma.$AtendimentoPayload>
/**
 * Model WhatsAppConfig
 * 
 */
export type WhatsAppConfig = $Result.DefaultSelection<Prisma.$WhatsAppConfigPayload>
/**
 * Model LogSistema
 * 
 */
export type LogSistema = $Result.DefaultSelection<Prisma.$LogSistemaPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const TipoUsuario: {
  ADMIN: 'ADMIN',
  SECRETARIA: 'SECRETARIA'
};

export type TipoUsuario = (typeof TipoUsuario)[keyof typeof TipoUsuario]


export const StatusAgendamento: {
  MARCADO: 'MARCADO',
  CONFIRMADO: 'CONFIRMADO',
  COMPARECEU: 'COMPARECEU',
  FALTOU: 'FALTOU',
  CANCELADO: 'CANCELADO'
};

export type StatusAgendamento = (typeof StatusAgendamento)[keyof typeof StatusAgendamento]


export const TipoLog: {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  AGENDAMENTO_CRIADO: 'AGENDAMENTO_CRIADO',
  AGENDAMENTO_ATUALIZADO: 'AGENDAMENTO_ATUALIZADO',
  AGENDAMENTO_CANCELADO: 'AGENDAMENTO_CANCELADO',
  CONFIRMACAO_ENVIADA: 'CONFIRMACAO_ENVIADA',
  CONFIRMACAO_RECEBIDA: 'CONFIRMACAO_RECEBIDA',
  SYNC_GOOGLE_CALENDAR: 'SYNC_GOOGLE_CALENDAR',
  ERROR: 'ERROR',
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
};

export type TipoLog = (typeof TipoLog)[keyof typeof TipoLog]

}

export type TipoUsuario = $Enums.TipoUsuario

export const TipoUsuario: typeof $Enums.TipoUsuario

export type StatusAgendamento = $Enums.StatusAgendamento

export const StatusAgendamento: typeof $Enums.StatusAgendamento

export type TipoLog = $Enums.TipoLog

export const TipoLog: typeof $Enums.TipoLog

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Tenants
 * const tenants = await prisma.tenant.findMany()
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
   * // Fetch zero or more Tenants
   * const tenants = await prisma.tenant.findMany()
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
   * `prisma.tenant`: Exposes CRUD operations for the **Tenant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tenants
    * const tenants = await prisma.tenant.findMany()
    * ```
    */
  get tenant(): Prisma.TenantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.usuario`: Exposes CRUD operations for the **Usuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuario.findMany()
    * ```
    */
  get usuario(): Prisma.UsuarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.profissional`: Exposes CRUD operations for the **Profissional** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profissionals
    * const profissionals = await prisma.profissional.findMany()
    * ```
    */
  get profissional(): Prisma.ProfissionalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.paciente`: Exposes CRUD operations for the **Paciente** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pacientes
    * const pacientes = await prisma.paciente.findMany()
    * ```
    */
  get paciente(): Prisma.PacienteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.procedimento`: Exposes CRUD operations for the **Procedimento** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Procedimentos
    * const procedimentos = await prisma.procedimento.findMany()
    * ```
    */
  get procedimento(): Prisma.ProcedimentoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.agendamento`: Exposes CRUD operations for the **Agendamento** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Agendamentos
    * const agendamentos = await prisma.agendamento.findMany()
    * ```
    */
  get agendamento(): Prisma.AgendamentoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.atendimento`: Exposes CRUD operations for the **Atendimento** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Atendimentos
    * const atendimentos = await prisma.atendimento.findMany()
    * ```
    */
  get atendimento(): Prisma.AtendimentoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.whatsAppConfig`: Exposes CRUD operations for the **WhatsAppConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WhatsAppConfigs
    * const whatsAppConfigs = await prisma.whatsAppConfig.findMany()
    * ```
    */
  get whatsAppConfig(): Prisma.WhatsAppConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.logSistema`: Exposes CRUD operations for the **LogSistema** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LogSistemas
    * const logSistemas = await prisma.logSistema.findMany()
    * ```
    */
  get logSistema(): Prisma.LogSistemaDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.16.2
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
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
    Tenant: 'Tenant',
    Usuario: 'Usuario',
    Profissional: 'Profissional',
    Paciente: 'Paciente',
    Procedimento: 'Procedimento',
    Agendamento: 'Agendamento',
    Atendimento: 'Atendimento',
    WhatsAppConfig: 'WhatsAppConfig',
    LogSistema: 'LogSistema'
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
      modelProps: "tenant" | "usuario" | "profissional" | "paciente" | "procedimento" | "agendamento" | "atendimento" | "whatsAppConfig" | "logSistema"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Tenant: {
        payload: Prisma.$TenantPayload<ExtArgs>
        fields: Prisma.TenantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TenantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TenantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          findFirst: {
            args: Prisma.TenantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TenantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          findMany: {
            args: Prisma.TenantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          create: {
            args: Prisma.TenantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          createMany: {
            args: Prisma.TenantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TenantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          delete: {
            args: Prisma.TenantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          update: {
            args: Prisma.TenantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          deleteMany: {
            args: Prisma.TenantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TenantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TenantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          upsert: {
            args: Prisma.TenantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          aggregate: {
            args: Prisma.TenantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTenant>
          }
          groupBy: {
            args: Prisma.TenantGroupByArgs<ExtArgs>
            result: $Utils.Optional<TenantGroupByOutputType>[]
          }
          count: {
            args: Prisma.TenantCountArgs<ExtArgs>
            result: $Utils.Optional<TenantCountAggregateOutputType> | number
          }
        }
      }
      Usuario: {
        payload: Prisma.$UsuarioPayload<ExtArgs>
        fields: Prisma.UsuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findFirst: {
            args: Prisma.UsuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findMany: {
            args: Prisma.UsuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          create: {
            args: Prisma.UsuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          createMany: {
            args: Prisma.UsuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsuarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          delete: {
            args: Prisma.UsuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          update: {
            args: Prisma.UsuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          deleteMany: {
            args: Prisma.UsuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsuarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          upsert: {
            args: Prisma.UsuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          aggregate: {
            args: Prisma.UsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuario>
          }
          groupBy: {
            args: Prisma.UsuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsuarioCountArgs<ExtArgs>
            result: $Utils.Optional<UsuarioCountAggregateOutputType> | number
          }
        }
      }
      Profissional: {
        payload: Prisma.$ProfissionalPayload<ExtArgs>
        fields: Prisma.ProfissionalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfissionalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfissionalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfissionalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfissionalPayload>
          }
          findFirst: {
            args: Prisma.ProfissionalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfissionalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfissionalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfissionalPayload>
          }
          findMany: {
            args: Prisma.ProfissionalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfissionalPayload>[]
          }
          create: {
            args: Prisma.ProfissionalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfissionalPayload>
          }
          createMany: {
            args: Prisma.ProfissionalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfissionalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfissionalPayload>[]
          }
          delete: {
            args: Prisma.ProfissionalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfissionalPayload>
          }
          update: {
            args: Prisma.ProfissionalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfissionalPayload>
          }
          deleteMany: {
            args: Prisma.ProfissionalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfissionalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfissionalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfissionalPayload>[]
          }
          upsert: {
            args: Prisma.ProfissionalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfissionalPayload>
          }
          aggregate: {
            args: Prisma.ProfissionalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfissional>
          }
          groupBy: {
            args: Prisma.ProfissionalGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfissionalGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfissionalCountArgs<ExtArgs>
            result: $Utils.Optional<ProfissionalCountAggregateOutputType> | number
          }
        }
      }
      Paciente: {
        payload: Prisma.$PacientePayload<ExtArgs>
        fields: Prisma.PacienteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PacienteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PacientePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PacienteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PacientePayload>
          }
          findFirst: {
            args: Prisma.PacienteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PacientePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PacienteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PacientePayload>
          }
          findMany: {
            args: Prisma.PacienteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PacientePayload>[]
          }
          create: {
            args: Prisma.PacienteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PacientePayload>
          }
          createMany: {
            args: Prisma.PacienteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PacienteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PacientePayload>[]
          }
          delete: {
            args: Prisma.PacienteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PacientePayload>
          }
          update: {
            args: Prisma.PacienteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PacientePayload>
          }
          deleteMany: {
            args: Prisma.PacienteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PacienteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PacienteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PacientePayload>[]
          }
          upsert: {
            args: Prisma.PacienteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PacientePayload>
          }
          aggregate: {
            args: Prisma.PacienteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePaciente>
          }
          groupBy: {
            args: Prisma.PacienteGroupByArgs<ExtArgs>
            result: $Utils.Optional<PacienteGroupByOutputType>[]
          }
          count: {
            args: Prisma.PacienteCountArgs<ExtArgs>
            result: $Utils.Optional<PacienteCountAggregateOutputType> | number
          }
        }
      }
      Procedimento: {
        payload: Prisma.$ProcedimentoPayload<ExtArgs>
        fields: Prisma.ProcedimentoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProcedimentoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcedimentoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProcedimentoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcedimentoPayload>
          }
          findFirst: {
            args: Prisma.ProcedimentoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcedimentoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProcedimentoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcedimentoPayload>
          }
          findMany: {
            args: Prisma.ProcedimentoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcedimentoPayload>[]
          }
          create: {
            args: Prisma.ProcedimentoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcedimentoPayload>
          }
          createMany: {
            args: Prisma.ProcedimentoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProcedimentoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcedimentoPayload>[]
          }
          delete: {
            args: Prisma.ProcedimentoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcedimentoPayload>
          }
          update: {
            args: Prisma.ProcedimentoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcedimentoPayload>
          }
          deleteMany: {
            args: Prisma.ProcedimentoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProcedimentoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProcedimentoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcedimentoPayload>[]
          }
          upsert: {
            args: Prisma.ProcedimentoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcedimentoPayload>
          }
          aggregate: {
            args: Prisma.ProcedimentoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProcedimento>
          }
          groupBy: {
            args: Prisma.ProcedimentoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProcedimentoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProcedimentoCountArgs<ExtArgs>
            result: $Utils.Optional<ProcedimentoCountAggregateOutputType> | number
          }
        }
      }
      Agendamento: {
        payload: Prisma.$AgendamentoPayload<ExtArgs>
        fields: Prisma.AgendamentoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgendamentoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendamentoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgendamentoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendamentoPayload>
          }
          findFirst: {
            args: Prisma.AgendamentoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendamentoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgendamentoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendamentoPayload>
          }
          findMany: {
            args: Prisma.AgendamentoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendamentoPayload>[]
          }
          create: {
            args: Prisma.AgendamentoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendamentoPayload>
          }
          createMany: {
            args: Prisma.AgendamentoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgendamentoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendamentoPayload>[]
          }
          delete: {
            args: Prisma.AgendamentoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendamentoPayload>
          }
          update: {
            args: Prisma.AgendamentoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendamentoPayload>
          }
          deleteMany: {
            args: Prisma.AgendamentoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgendamentoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AgendamentoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendamentoPayload>[]
          }
          upsert: {
            args: Prisma.AgendamentoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendamentoPayload>
          }
          aggregate: {
            args: Prisma.AgendamentoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgendamento>
          }
          groupBy: {
            args: Prisma.AgendamentoGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgendamentoGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgendamentoCountArgs<ExtArgs>
            result: $Utils.Optional<AgendamentoCountAggregateOutputType> | number
          }
        }
      }
      Atendimento: {
        payload: Prisma.$AtendimentoPayload<ExtArgs>
        fields: Prisma.AtendimentoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AtendimentoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AtendimentoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AtendimentoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AtendimentoPayload>
          }
          findFirst: {
            args: Prisma.AtendimentoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AtendimentoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AtendimentoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AtendimentoPayload>
          }
          findMany: {
            args: Prisma.AtendimentoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AtendimentoPayload>[]
          }
          create: {
            args: Prisma.AtendimentoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AtendimentoPayload>
          }
          createMany: {
            args: Prisma.AtendimentoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AtendimentoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AtendimentoPayload>[]
          }
          delete: {
            args: Prisma.AtendimentoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AtendimentoPayload>
          }
          update: {
            args: Prisma.AtendimentoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AtendimentoPayload>
          }
          deleteMany: {
            args: Prisma.AtendimentoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AtendimentoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AtendimentoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AtendimentoPayload>[]
          }
          upsert: {
            args: Prisma.AtendimentoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AtendimentoPayload>
          }
          aggregate: {
            args: Prisma.AtendimentoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAtendimento>
          }
          groupBy: {
            args: Prisma.AtendimentoGroupByArgs<ExtArgs>
            result: $Utils.Optional<AtendimentoGroupByOutputType>[]
          }
          count: {
            args: Prisma.AtendimentoCountArgs<ExtArgs>
            result: $Utils.Optional<AtendimentoCountAggregateOutputType> | number
          }
        }
      }
      WhatsAppConfig: {
        payload: Prisma.$WhatsAppConfigPayload<ExtArgs>
        fields: Prisma.WhatsAppConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WhatsAppConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsAppConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WhatsAppConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsAppConfigPayload>
          }
          findFirst: {
            args: Prisma.WhatsAppConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsAppConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WhatsAppConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsAppConfigPayload>
          }
          findMany: {
            args: Prisma.WhatsAppConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsAppConfigPayload>[]
          }
          create: {
            args: Prisma.WhatsAppConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsAppConfigPayload>
          }
          createMany: {
            args: Prisma.WhatsAppConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WhatsAppConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsAppConfigPayload>[]
          }
          delete: {
            args: Prisma.WhatsAppConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsAppConfigPayload>
          }
          update: {
            args: Prisma.WhatsAppConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsAppConfigPayload>
          }
          deleteMany: {
            args: Prisma.WhatsAppConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WhatsAppConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WhatsAppConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsAppConfigPayload>[]
          }
          upsert: {
            args: Prisma.WhatsAppConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsAppConfigPayload>
          }
          aggregate: {
            args: Prisma.WhatsAppConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWhatsAppConfig>
          }
          groupBy: {
            args: Prisma.WhatsAppConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<WhatsAppConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.WhatsAppConfigCountArgs<ExtArgs>
            result: $Utils.Optional<WhatsAppConfigCountAggregateOutputType> | number
          }
        }
      }
      LogSistema: {
        payload: Prisma.$LogSistemaPayload<ExtArgs>
        fields: Prisma.LogSistemaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LogSistemaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogSistemaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LogSistemaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogSistemaPayload>
          }
          findFirst: {
            args: Prisma.LogSistemaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogSistemaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LogSistemaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogSistemaPayload>
          }
          findMany: {
            args: Prisma.LogSistemaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogSistemaPayload>[]
          }
          create: {
            args: Prisma.LogSistemaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogSistemaPayload>
          }
          createMany: {
            args: Prisma.LogSistemaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LogSistemaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogSistemaPayload>[]
          }
          delete: {
            args: Prisma.LogSistemaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogSistemaPayload>
          }
          update: {
            args: Prisma.LogSistemaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogSistemaPayload>
          }
          deleteMany: {
            args: Prisma.LogSistemaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LogSistemaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LogSistemaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogSistemaPayload>[]
          }
          upsert: {
            args: Prisma.LogSistemaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogSistemaPayload>
          }
          aggregate: {
            args: Prisma.LogSistemaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLogSistema>
          }
          groupBy: {
            args: Prisma.LogSistemaGroupByArgs<ExtArgs>
            result: $Utils.Optional<LogSistemaGroupByOutputType>[]
          }
          count: {
            args: Prisma.LogSistemaCountArgs<ExtArgs>
            result: $Utils.Optional<LogSistemaCountAggregateOutputType> | number
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
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
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
    tenant?: TenantOmit
    usuario?: UsuarioOmit
    profissional?: ProfissionalOmit
    paciente?: PacienteOmit
    procedimento?: ProcedimentoOmit
    agendamento?: AgendamentoOmit
    atendimento?: AtendimentoOmit
    whatsAppConfig?: WhatsAppConfigOmit
    logSistema?: LogSistemaOmit
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
   * Count Type TenantCountOutputType
   */

  export type TenantCountOutputType = {
    agendamentos: number
    atendimentos: number
    pacientes: number
    procedimentos: number
    profissionais: number
    usuarios: number
  }

  export type TenantCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agendamentos?: boolean | TenantCountOutputTypeCountAgendamentosArgs
    atendimentos?: boolean | TenantCountOutputTypeCountAtendimentosArgs
    pacientes?: boolean | TenantCountOutputTypeCountPacientesArgs
    procedimentos?: boolean | TenantCountOutputTypeCountProcedimentosArgs
    profissionais?: boolean | TenantCountOutputTypeCountProfissionaisArgs
    usuarios?: boolean | TenantCountOutputTypeCountUsuariosArgs
  }

  // Custom InputTypes
  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantCountOutputType
     */
    select?: TenantCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountAgendamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgendamentoWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountAtendimentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AtendimentoWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountPacientesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PacienteWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountProcedimentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProcedimentoWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountProfissionaisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfissionalWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountUsuariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
  }


  /**
   * Count Type ProfissionalCountOutputType
   */

  export type ProfissionalCountOutputType = {
    agendamentos: number
    atendimentos: number
    pacientes: number
  }

  export type ProfissionalCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agendamentos?: boolean | ProfissionalCountOutputTypeCountAgendamentosArgs
    atendimentos?: boolean | ProfissionalCountOutputTypeCountAtendimentosArgs
    pacientes?: boolean | ProfissionalCountOutputTypeCountPacientesArgs
  }

  // Custom InputTypes
  /**
   * ProfissionalCountOutputType without action
   */
  export type ProfissionalCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfissionalCountOutputType
     */
    select?: ProfissionalCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProfissionalCountOutputType without action
   */
  export type ProfissionalCountOutputTypeCountAgendamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgendamentoWhereInput
  }

  /**
   * ProfissionalCountOutputType without action
   */
  export type ProfissionalCountOutputTypeCountAtendimentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AtendimentoWhereInput
  }

  /**
   * ProfissionalCountOutputType without action
   */
  export type ProfissionalCountOutputTypeCountPacientesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PacienteWhereInput
  }


  /**
   * Count Type PacienteCountOutputType
   */

  export type PacienteCountOutputType = {
    agendamentos: number
    atendimentos: number
  }

  export type PacienteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agendamentos?: boolean | PacienteCountOutputTypeCountAgendamentosArgs
    atendimentos?: boolean | PacienteCountOutputTypeCountAtendimentosArgs
  }

  // Custom InputTypes
  /**
   * PacienteCountOutputType without action
   */
  export type PacienteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PacienteCountOutputType
     */
    select?: PacienteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PacienteCountOutputType without action
   */
  export type PacienteCountOutputTypeCountAgendamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgendamentoWhereInput
  }

  /**
   * PacienteCountOutputType without action
   */
  export type PacienteCountOutputTypeCountAtendimentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AtendimentoWhereInput
  }


  /**
   * Count Type ProcedimentoCountOutputType
   */

  export type ProcedimentoCountOutputType = {
    agendamentos: number
    atendimentos: number
  }

  export type ProcedimentoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agendamentos?: boolean | ProcedimentoCountOutputTypeCountAgendamentosArgs
    atendimentos?: boolean | ProcedimentoCountOutputTypeCountAtendimentosArgs
  }

  // Custom InputTypes
  /**
   * ProcedimentoCountOutputType without action
   */
  export type ProcedimentoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcedimentoCountOutputType
     */
    select?: ProcedimentoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProcedimentoCountOutputType without action
   */
  export type ProcedimentoCountOutputTypeCountAgendamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgendamentoWhereInput
  }

  /**
   * ProcedimentoCountOutputType without action
   */
  export type ProcedimentoCountOutputTypeCountAtendimentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AtendimentoWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Tenant
   */

  export type AggregateTenant = {
    _count: TenantCountAggregateOutputType | null
    _min: TenantMinAggregateOutputType | null
    _max: TenantMaxAggregateOutputType | null
  }

  export type TenantMinAggregateOutputType = {
    id: string | null
    nome: string | null
    plano: string | null
    ativo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TenantMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    plano: string | null
    ativo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TenantCountAggregateOutputType = {
    id: number
    nome: number
    plano: number
    ativo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TenantMinAggregateInputType = {
    id?: true
    nome?: true
    plano?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TenantMaxAggregateInputType = {
    id?: true
    nome?: true
    plano?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TenantCountAggregateInputType = {
    id?: true
    nome?: true
    plano?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TenantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tenant to aggregate.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tenants
    **/
    _count?: true | TenantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TenantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TenantMaxAggregateInputType
  }

  export type GetTenantAggregateType<T extends TenantAggregateArgs> = {
        [P in keyof T & keyof AggregateTenant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTenant[P]>
      : GetScalarType<T[P], AggregateTenant[P]>
  }




  export type TenantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantWhereInput
    orderBy?: TenantOrderByWithAggregationInput | TenantOrderByWithAggregationInput[]
    by: TenantScalarFieldEnum[] | TenantScalarFieldEnum
    having?: TenantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TenantCountAggregateInputType | true
    _min?: TenantMinAggregateInputType
    _max?: TenantMaxAggregateInputType
  }

  export type TenantGroupByOutputType = {
    id: string
    nome: string
    plano: string
    ativo: boolean
    createdAt: Date
    updatedAt: Date
    _count: TenantCountAggregateOutputType | null
    _min: TenantMinAggregateOutputType | null
    _max: TenantMaxAggregateOutputType | null
  }

  type GetTenantGroupByPayload<T extends TenantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TenantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TenantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TenantGroupByOutputType[P]>
            : GetScalarType<T[P], TenantGroupByOutputType[P]>
        }
      >
    >


  export type TenantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    plano?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    agendamentos?: boolean | Tenant$agendamentosArgs<ExtArgs>
    atendimentos?: boolean | Tenant$atendimentosArgs<ExtArgs>
    pacientes?: boolean | Tenant$pacientesArgs<ExtArgs>
    procedimentos?: boolean | Tenant$procedimentosArgs<ExtArgs>
    profissionais?: boolean | Tenant$profissionaisArgs<ExtArgs>
    usuarios?: boolean | Tenant$usuariosArgs<ExtArgs>
    whatsappConfig?: boolean | Tenant$whatsappConfigArgs<ExtArgs>
    _count?: boolean | TenantCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    plano?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    plano?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectScalar = {
    id?: boolean
    nome?: boolean
    plano?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TenantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "plano" | "ativo" | "createdAt" | "updatedAt", ExtArgs["result"]["tenant"]>
  export type TenantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agendamentos?: boolean | Tenant$agendamentosArgs<ExtArgs>
    atendimentos?: boolean | Tenant$atendimentosArgs<ExtArgs>
    pacientes?: boolean | Tenant$pacientesArgs<ExtArgs>
    procedimentos?: boolean | Tenant$procedimentosArgs<ExtArgs>
    profissionais?: boolean | Tenant$profissionaisArgs<ExtArgs>
    usuarios?: boolean | Tenant$usuariosArgs<ExtArgs>
    whatsappConfig?: boolean | Tenant$whatsappConfigArgs<ExtArgs>
    _count?: boolean | TenantCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TenantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TenantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TenantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tenant"
    objects: {
      agendamentos: Prisma.$AgendamentoPayload<ExtArgs>[]
      atendimentos: Prisma.$AtendimentoPayload<ExtArgs>[]
      pacientes: Prisma.$PacientePayload<ExtArgs>[]
      procedimentos: Prisma.$ProcedimentoPayload<ExtArgs>[]
      profissionais: Prisma.$ProfissionalPayload<ExtArgs>[]
      usuarios: Prisma.$UsuarioPayload<ExtArgs>[]
      whatsappConfig: Prisma.$WhatsAppConfigPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      plano: string
      ativo: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tenant"]>
    composites: {}
  }

  type TenantGetPayload<S extends boolean | null | undefined | TenantDefaultArgs> = $Result.GetResult<Prisma.$TenantPayload, S>

  type TenantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TenantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TenantCountAggregateInputType | true
    }

  export interface TenantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tenant'], meta: { name: 'Tenant' } }
    /**
     * Find zero or one Tenant that matches the filter.
     * @param {TenantFindUniqueArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TenantFindUniqueArgs>(args: SelectSubset<T, TenantFindUniqueArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tenant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TenantFindUniqueOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TenantFindUniqueOrThrowArgs>(args: SelectSubset<T, TenantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tenant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TenantFindFirstArgs>(args?: SelectSubset<T, TenantFindFirstArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tenant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TenantFindFirstOrThrowArgs>(args?: SelectSubset<T, TenantFindFirstOrThrowArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tenants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tenants
     * const tenants = await prisma.tenant.findMany()
     * 
     * // Get first 10 Tenants
     * const tenants = await prisma.tenant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tenantWithIdOnly = await prisma.tenant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TenantFindManyArgs>(args?: SelectSubset<T, TenantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tenant.
     * @param {TenantCreateArgs} args - Arguments to create a Tenant.
     * @example
     * // Create one Tenant
     * const Tenant = await prisma.tenant.create({
     *   data: {
     *     // ... data to create a Tenant
     *   }
     * })
     * 
     */
    create<T extends TenantCreateArgs>(args: SelectSubset<T, TenantCreateArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tenants.
     * @param {TenantCreateManyArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenant = await prisma.tenant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TenantCreateManyArgs>(args?: SelectSubset<T, TenantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tenants and returns the data saved in the database.
     * @param {TenantCreateManyAndReturnArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenant = await prisma.tenant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tenants and only return the `id`
     * const tenantWithIdOnly = await prisma.tenant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TenantCreateManyAndReturnArgs>(args?: SelectSubset<T, TenantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tenant.
     * @param {TenantDeleteArgs} args - Arguments to delete one Tenant.
     * @example
     * // Delete one Tenant
     * const Tenant = await prisma.tenant.delete({
     *   where: {
     *     // ... filter to delete one Tenant
     *   }
     * })
     * 
     */
    delete<T extends TenantDeleteArgs>(args: SelectSubset<T, TenantDeleteArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tenant.
     * @param {TenantUpdateArgs} args - Arguments to update one Tenant.
     * @example
     * // Update one Tenant
     * const tenant = await prisma.tenant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TenantUpdateArgs>(args: SelectSubset<T, TenantUpdateArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tenants.
     * @param {TenantDeleteManyArgs} args - Arguments to filter Tenants to delete.
     * @example
     * // Delete a few Tenants
     * const { count } = await prisma.tenant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TenantDeleteManyArgs>(args?: SelectSubset<T, TenantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tenants
     * const tenant = await prisma.tenant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TenantUpdateManyArgs>(args: SelectSubset<T, TenantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tenants and returns the data updated in the database.
     * @param {TenantUpdateManyAndReturnArgs} args - Arguments to update many Tenants.
     * @example
     * // Update many Tenants
     * const tenant = await prisma.tenant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tenants and only return the `id`
     * const tenantWithIdOnly = await prisma.tenant.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends TenantUpdateManyAndReturnArgs>(args: SelectSubset<T, TenantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tenant.
     * @param {TenantUpsertArgs} args - Arguments to update or create a Tenant.
     * @example
     * // Update or create a Tenant
     * const tenant = await prisma.tenant.upsert({
     *   create: {
     *     // ... data to create a Tenant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tenant we want to update
     *   }
     * })
     */
    upsert<T extends TenantUpsertArgs>(args: SelectSubset<T, TenantUpsertArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantCountArgs} args - Arguments to filter Tenants to count.
     * @example
     * // Count the number of Tenants
     * const count = await prisma.tenant.count({
     *   where: {
     *     // ... the filter for the Tenants we want to count
     *   }
     * })
    **/
    count<T extends TenantCountArgs>(
      args?: Subset<T, TenantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TenantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TenantAggregateArgs>(args: Subset<T, TenantAggregateArgs>): Prisma.PrismaPromise<GetTenantAggregateType<T>>

    /**
     * Group by Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantGroupByArgs} args - Group by arguments.
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
      T extends TenantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TenantGroupByArgs['orderBy'] }
        : { orderBy?: TenantGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TenantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tenant model
   */
  readonly fields: TenantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tenant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TenantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agendamentos<T extends Tenant$agendamentosArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$agendamentosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgendamentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    atendimentos<T extends Tenant$atendimentosArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$atendimentosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AtendimentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pacientes<T extends Tenant$pacientesArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$pacientesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    procedimentos<T extends Tenant$procedimentosArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$procedimentosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcedimentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    profissionais<T extends Tenant$profissionaisArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$profissionaisArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfissionalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    usuarios<T extends Tenant$usuariosArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$usuariosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    whatsappConfig<T extends Tenant$whatsappConfigArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$whatsappConfigArgs<ExtArgs>>): Prisma__WhatsAppConfigClient<$Result.GetResult<Prisma.$WhatsAppConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Tenant model
   */
  interface TenantFieldRefs {
    readonly id: FieldRef<"Tenant", 'String'>
    readonly nome: FieldRef<"Tenant", 'String'>
    readonly plano: FieldRef<"Tenant", 'String'>
    readonly ativo: FieldRef<"Tenant", 'Boolean'>
    readonly createdAt: FieldRef<"Tenant", 'DateTime'>
    readonly updatedAt: FieldRef<"Tenant", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Tenant findUnique
   */
  export type TenantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant findUniqueOrThrow
   */
  export type TenantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant findFirst
   */
  export type TenantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant findFirstOrThrow
   */
  export type TenantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant findMany
   */
  export type TenantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenants to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant create
   */
  export type TenantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The data needed to create a Tenant.
     */
    data: XOR<TenantCreateInput, TenantUncheckedCreateInput>
  }

  /**
   * Tenant createMany
   */
  export type TenantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tenants.
     */
    data: TenantCreateManyInput | TenantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tenant createManyAndReturn
   */
  export type TenantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * The data used to create many Tenants.
     */
    data: TenantCreateManyInput | TenantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tenant update
   */
  export type TenantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The data needed to update a Tenant.
     */
    data: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>
    /**
     * Choose, which Tenant to update.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant updateMany
   */
  export type TenantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tenants.
     */
    data: XOR<TenantUpdateManyMutationInput, TenantUncheckedUpdateManyInput>
    /**
     * Filter which Tenants to update
     */
    where?: TenantWhereInput
    /**
     * Limit how many Tenants to update.
     */
    limit?: number
  }

  /**
   * Tenant updateManyAndReturn
   */
  export type TenantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * The data used to update Tenants.
     */
    data: XOR<TenantUpdateManyMutationInput, TenantUncheckedUpdateManyInput>
    /**
     * Filter which Tenants to update
     */
    where?: TenantWhereInput
    /**
     * Limit how many Tenants to update.
     */
    limit?: number
  }

  /**
   * Tenant upsert
   */
  export type TenantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The filter to search for the Tenant to update in case it exists.
     */
    where: TenantWhereUniqueInput
    /**
     * In case the Tenant found by the `where` argument doesn't exist, create a new Tenant with this data.
     */
    create: XOR<TenantCreateInput, TenantUncheckedCreateInput>
    /**
     * In case the Tenant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>
  }

  /**
   * Tenant delete
   */
  export type TenantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter which Tenant to delete.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant deleteMany
   */
  export type TenantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tenants to delete
     */
    where?: TenantWhereInput
    /**
     * Limit how many Tenants to delete.
     */
    limit?: number
  }

  /**
   * Tenant.agendamentos
   */
  export type Tenant$agendamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agendamento
     */
    select?: AgendamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agendamento
     */
    omit?: AgendamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendamentoInclude<ExtArgs> | null
    where?: AgendamentoWhereInput
    orderBy?: AgendamentoOrderByWithRelationInput | AgendamentoOrderByWithRelationInput[]
    cursor?: AgendamentoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgendamentoScalarFieldEnum | AgendamentoScalarFieldEnum[]
  }

  /**
   * Tenant.atendimentos
   */
  export type Tenant$atendimentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Atendimento
     */
    select?: AtendimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Atendimento
     */
    omit?: AtendimentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AtendimentoInclude<ExtArgs> | null
    where?: AtendimentoWhereInput
    orderBy?: AtendimentoOrderByWithRelationInput | AtendimentoOrderByWithRelationInput[]
    cursor?: AtendimentoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AtendimentoScalarFieldEnum | AtendimentoScalarFieldEnum[]
  }

  /**
   * Tenant.pacientes
   */
  export type Tenant$pacientesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paciente
     */
    select?: PacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Paciente
     */
    omit?: PacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacienteInclude<ExtArgs> | null
    where?: PacienteWhereInput
    orderBy?: PacienteOrderByWithRelationInput | PacienteOrderByWithRelationInput[]
    cursor?: PacienteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PacienteScalarFieldEnum | PacienteScalarFieldEnum[]
  }

  /**
   * Tenant.procedimentos
   */
  export type Tenant$procedimentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procedimento
     */
    select?: ProcedimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Procedimento
     */
    omit?: ProcedimentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcedimentoInclude<ExtArgs> | null
    where?: ProcedimentoWhereInput
    orderBy?: ProcedimentoOrderByWithRelationInput | ProcedimentoOrderByWithRelationInput[]
    cursor?: ProcedimentoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProcedimentoScalarFieldEnum | ProcedimentoScalarFieldEnum[]
  }

  /**
   * Tenant.profissionais
   */
  export type Tenant$profissionaisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profissional
     */
    select?: ProfissionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profissional
     */
    omit?: ProfissionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfissionalInclude<ExtArgs> | null
    where?: ProfissionalWhereInput
    orderBy?: ProfissionalOrderByWithRelationInput | ProfissionalOrderByWithRelationInput[]
    cursor?: ProfissionalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProfissionalScalarFieldEnum | ProfissionalScalarFieldEnum[]
  }

  /**
   * Tenant.usuarios
   */
  export type Tenant$usuariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    cursor?: UsuarioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Tenant.whatsappConfig
   */
  export type Tenant$whatsappConfigArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsAppConfig
     */
    select?: WhatsAppConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WhatsAppConfig
     */
    omit?: WhatsAppConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WhatsAppConfigInclude<ExtArgs> | null
    where?: WhatsAppConfigWhereInput
  }

  /**
   * Tenant without action
   */
  export type TenantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
  }


  /**
   * Model Usuario
   */

  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  export type UsuarioMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    nome: string | null
    email: string | null
    senha: string | null
    tipo: $Enums.TipoUsuario | null
    ativo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UsuarioMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    nome: string | null
    email: string | null
    senha: string | null
    tipo: $Enums.TipoUsuario | null
    ativo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UsuarioCountAggregateOutputType = {
    id: number
    tenantId: number
    nome: number
    email: number
    senha: number
    tipo: number
    ativo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UsuarioMinAggregateInputType = {
    id?: true
    tenantId?: true
    nome?: true
    email?: true
    senha?: true
    tipo?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UsuarioMaxAggregateInputType = {
    id?: true
    tenantId?: true
    nome?: true
    email?: true
    senha?: true
    tipo?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UsuarioCountAggregateInputType = {
    id?: true
    tenantId?: true
    nome?: true
    email?: true
    senha?: true
    tipo?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuario to aggregate.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Usuarios
    **/
    _count?: true | UsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuarioMaxAggregateInputType
  }

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>
  }




  export type UsuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithAggregationInput | UsuarioOrderByWithAggregationInput[]
    by: UsuarioScalarFieldEnum[] | UsuarioScalarFieldEnum
    having?: UsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuarioCountAggregateInputType | true
    _min?: UsuarioMinAggregateInputType
    _max?: UsuarioMaxAggregateInputType
  }

  export type UsuarioGroupByOutputType = {
    id: string
    tenantId: string
    nome: string
    email: string
    senha: string
    tipo: $Enums.TipoUsuario
    ativo: boolean
    createdAt: Date
    updatedAt: Date
    _count: UsuarioCountAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  type GetUsuarioGroupByPayload<T extends UsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
        }
      >
    >


  export type UsuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    tipo?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    tipo?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    tipo?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectScalar = {
    id?: boolean
    tenantId?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    tipo?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UsuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "nome" | "email" | "senha" | "tipo" | "ativo" | "createdAt" | "updatedAt", ExtArgs["result"]["usuario"]>
  export type UsuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type UsuarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type UsuarioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $UsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Usuario"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      nome: string
      email: string
      senha: string
      tipo: $Enums.TipoUsuario
      ativo: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["usuario"]>
    composites: {}
  }

  type UsuarioGetPayload<S extends boolean | null | undefined | UsuarioDefaultArgs> = $Result.GetResult<Prisma.$UsuarioPayload, S>

  type UsuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuarioCountAggregateInputType | true
    }

  export interface UsuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Usuario'], meta: { name: 'Usuario' } }
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {UsuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsuarioFindUniqueArgs>(args: SelectSubset<T, UsuarioFindUniqueArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, UsuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsuarioFindFirstArgs>(args?: SelectSubset<T, UsuarioFindFirstArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, UsuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usuarioWithIdOnly = await prisma.usuario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsuarioFindManyArgs>(args?: SelectSubset<T, UsuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuario.
     * @param {UsuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     * 
     */
    create<T extends UsuarioCreateArgs>(args: SelectSubset<T, UsuarioCreateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {UsuarioCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsuarioCreateManyArgs>(args?: SelectSubset<T, UsuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Usuarios and returns the data saved in the database.
     * @param {UsuarioCreateManyAndReturnArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsuarioCreateManyAndReturnArgs>(args?: SelectSubset<T, UsuarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Usuario.
     * @param {UsuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     * 
     */
    delete<T extends UsuarioDeleteArgs>(args: SelectSubset<T, UsuarioDeleteArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuario.
     * @param {UsuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsuarioUpdateArgs>(args: SelectSubset<T, UsuarioUpdateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {UsuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsuarioDeleteManyArgs>(args?: SelectSubset<T, UsuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsuarioUpdateManyArgs>(args: SelectSubset<T, UsuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios and returns the data updated in the database.
     * @param {UsuarioUpdateManyAndReturnArgs} args - Arguments to update many Usuarios.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends UsuarioUpdateManyAndReturnArgs>(args: SelectSubset<T, UsuarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Usuario.
     * @param {UsuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
     */
    upsert<T extends UsuarioUpsertArgs>(args: SelectSubset<T, UsuarioUpsertArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends UsuarioCountArgs>(
      args?: Subset<T, UsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UsuarioAggregateArgs>(args: Subset<T, UsuarioAggregateArgs>): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioGroupByArgs} args - Group by arguments.
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
      T extends UsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuarioGroupByArgs['orderBy'] }
        : { orderBy?: UsuarioGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Usuario model
   */
  readonly fields: UsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Usuario model
   */
  interface UsuarioFieldRefs {
    readonly id: FieldRef<"Usuario", 'String'>
    readonly tenantId: FieldRef<"Usuario", 'String'>
    readonly nome: FieldRef<"Usuario", 'String'>
    readonly email: FieldRef<"Usuario", 'String'>
    readonly senha: FieldRef<"Usuario", 'String'>
    readonly tipo: FieldRef<"Usuario", 'TipoUsuario'>
    readonly ativo: FieldRef<"Usuario", 'Boolean'>
    readonly createdAt: FieldRef<"Usuario", 'DateTime'>
    readonly updatedAt: FieldRef<"Usuario", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Usuario findUnique
   */
  export type UsuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findUniqueOrThrow
   */
  export type UsuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findFirst
   */
  export type UsuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findFirstOrThrow
   */
  export type UsuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findMany
   */
  export type UsuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario create
   */
  export type UsuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to create a Usuario.
     */
    data: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
  }

  /**
   * Usuario createMany
   */
  export type UsuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario createManyAndReturn
   */
  export type UsuarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Usuario update
   */
  export type UsuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to update a Usuario.
     */
    data: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
    /**
     * Choose, which Usuario to update.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario updateMany
   */
  export type UsuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario updateManyAndReturn
   */
  export type UsuarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Usuario upsert
   */
  export type UsuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The filter to search for the Usuario to update in case it exists.
     */
    where: UsuarioWhereUniqueInput
    /**
     * In case the Usuario found by the `where` argument doesn't exist, create a new Usuario with this data.
     */
    create: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
    /**
     * In case the Usuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
  }

  /**
   * Usuario delete
   */
  export type UsuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter which Usuario to delete.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario deleteMany
   */
  export type UsuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuarios to delete
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to delete.
     */
    limit?: number
  }

  /**
   * Usuario without action
   */
  export type UsuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
  }


  /**
   * Model Profissional
   */

  export type AggregateProfissional = {
    _count: ProfissionalCountAggregateOutputType | null
    _min: ProfissionalMinAggregateOutputType | null
    _max: ProfissionalMaxAggregateOutputType | null
  }

  export type ProfissionalMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    nome: string | null
    especialidade: string | null
    observacoes: string | null
    ativo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfissionalMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    nome: string | null
    especialidade: string | null
    observacoes: string | null
    ativo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfissionalCountAggregateOutputType = {
    id: number
    tenantId: number
    nome: number
    especialidade: number
    observacoes: number
    ativo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProfissionalMinAggregateInputType = {
    id?: true
    tenantId?: true
    nome?: true
    especialidade?: true
    observacoes?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfissionalMaxAggregateInputType = {
    id?: true
    tenantId?: true
    nome?: true
    especialidade?: true
    observacoes?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfissionalCountAggregateInputType = {
    id?: true
    tenantId?: true
    nome?: true
    especialidade?: true
    observacoes?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProfissionalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profissional to aggregate.
     */
    where?: ProfissionalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profissionals to fetch.
     */
    orderBy?: ProfissionalOrderByWithRelationInput | ProfissionalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfissionalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profissionals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profissionals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profissionals
    **/
    _count?: true | ProfissionalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfissionalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfissionalMaxAggregateInputType
  }

  export type GetProfissionalAggregateType<T extends ProfissionalAggregateArgs> = {
        [P in keyof T & keyof AggregateProfissional]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfissional[P]>
      : GetScalarType<T[P], AggregateProfissional[P]>
  }




  export type ProfissionalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfissionalWhereInput
    orderBy?: ProfissionalOrderByWithAggregationInput | ProfissionalOrderByWithAggregationInput[]
    by: ProfissionalScalarFieldEnum[] | ProfissionalScalarFieldEnum
    having?: ProfissionalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfissionalCountAggregateInputType | true
    _min?: ProfissionalMinAggregateInputType
    _max?: ProfissionalMaxAggregateInputType
  }

  export type ProfissionalGroupByOutputType = {
    id: string
    tenantId: string
    nome: string
    especialidade: string | null
    observacoes: string | null
    ativo: boolean
    createdAt: Date
    updatedAt: Date
    _count: ProfissionalCountAggregateOutputType | null
    _min: ProfissionalMinAggregateOutputType | null
    _max: ProfissionalMaxAggregateOutputType | null
  }

  type GetProfissionalGroupByPayload<T extends ProfissionalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfissionalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfissionalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfissionalGroupByOutputType[P]>
            : GetScalarType<T[P], ProfissionalGroupByOutputType[P]>
        }
      >
    >


  export type ProfissionalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    nome?: boolean
    especialidade?: boolean
    observacoes?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    agendamentos?: boolean | Profissional$agendamentosArgs<ExtArgs>
    atendimentos?: boolean | Profissional$atendimentosArgs<ExtArgs>
    pacientes?: boolean | Profissional$pacientesArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    _count?: boolean | ProfissionalCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profissional"]>

  export type ProfissionalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    nome?: boolean
    especialidade?: boolean
    observacoes?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profissional"]>

  export type ProfissionalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    nome?: boolean
    especialidade?: boolean
    observacoes?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profissional"]>

  export type ProfissionalSelectScalar = {
    id?: boolean
    tenantId?: boolean
    nome?: boolean
    especialidade?: boolean
    observacoes?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProfissionalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "nome" | "especialidade" | "observacoes" | "ativo" | "createdAt" | "updatedAt", ExtArgs["result"]["profissional"]>
  export type ProfissionalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agendamentos?: boolean | Profissional$agendamentosArgs<ExtArgs>
    atendimentos?: boolean | Profissional$atendimentosArgs<ExtArgs>
    pacientes?: boolean | Profissional$pacientesArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    _count?: boolean | ProfissionalCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProfissionalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type ProfissionalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $ProfissionalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Profissional"
    objects: {
      agendamentos: Prisma.$AgendamentoPayload<ExtArgs>[]
      atendimentos: Prisma.$AtendimentoPayload<ExtArgs>[]
      pacientes: Prisma.$PacientePayload<ExtArgs>[]
      tenant: Prisma.$TenantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      nome: string
      especialidade: string | null
      observacoes: string | null
      ativo: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["profissional"]>
    composites: {}
  }

  type ProfissionalGetPayload<S extends boolean | null | undefined | ProfissionalDefaultArgs> = $Result.GetResult<Prisma.$ProfissionalPayload, S>

  type ProfissionalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfissionalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfissionalCountAggregateInputType | true
    }

  export interface ProfissionalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Profissional'], meta: { name: 'Profissional' } }
    /**
     * Find zero or one Profissional that matches the filter.
     * @param {ProfissionalFindUniqueArgs} args - Arguments to find a Profissional
     * @example
     * // Get one Profissional
     * const profissional = await prisma.profissional.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfissionalFindUniqueArgs>(args: SelectSubset<T, ProfissionalFindUniqueArgs<ExtArgs>>): Prisma__ProfissionalClient<$Result.GetResult<Prisma.$ProfissionalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Profissional that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfissionalFindUniqueOrThrowArgs} args - Arguments to find a Profissional
     * @example
     * // Get one Profissional
     * const profissional = await prisma.profissional.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfissionalFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfissionalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfissionalClient<$Result.GetResult<Prisma.$ProfissionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profissional that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfissionalFindFirstArgs} args - Arguments to find a Profissional
     * @example
     * // Get one Profissional
     * const profissional = await prisma.profissional.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfissionalFindFirstArgs>(args?: SelectSubset<T, ProfissionalFindFirstArgs<ExtArgs>>): Prisma__ProfissionalClient<$Result.GetResult<Prisma.$ProfissionalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profissional that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfissionalFindFirstOrThrowArgs} args - Arguments to find a Profissional
     * @example
     * // Get one Profissional
     * const profissional = await prisma.profissional.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfissionalFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfissionalFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfissionalClient<$Result.GetResult<Prisma.$ProfissionalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Profissionals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfissionalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profissionals
     * const profissionals = await prisma.profissional.findMany()
     * 
     * // Get first 10 Profissionals
     * const profissionals = await prisma.profissional.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profissionalWithIdOnly = await prisma.profissional.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfissionalFindManyArgs>(args?: SelectSubset<T, ProfissionalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfissionalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Profissional.
     * @param {ProfissionalCreateArgs} args - Arguments to create a Profissional.
     * @example
     * // Create one Profissional
     * const Profissional = await prisma.profissional.create({
     *   data: {
     *     // ... data to create a Profissional
     *   }
     * })
     * 
     */
    create<T extends ProfissionalCreateArgs>(args: SelectSubset<T, ProfissionalCreateArgs<ExtArgs>>): Prisma__ProfissionalClient<$Result.GetResult<Prisma.$ProfissionalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Profissionals.
     * @param {ProfissionalCreateManyArgs} args - Arguments to create many Profissionals.
     * @example
     * // Create many Profissionals
     * const profissional = await prisma.profissional.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfissionalCreateManyArgs>(args?: SelectSubset<T, ProfissionalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Profissionals and returns the data saved in the database.
     * @param {ProfissionalCreateManyAndReturnArgs} args - Arguments to create many Profissionals.
     * @example
     * // Create many Profissionals
     * const profissional = await prisma.profissional.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Profissionals and only return the `id`
     * const profissionalWithIdOnly = await prisma.profissional.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfissionalCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfissionalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfissionalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Profissional.
     * @param {ProfissionalDeleteArgs} args - Arguments to delete one Profissional.
     * @example
     * // Delete one Profissional
     * const Profissional = await prisma.profissional.delete({
     *   where: {
     *     // ... filter to delete one Profissional
     *   }
     * })
     * 
     */
    delete<T extends ProfissionalDeleteArgs>(args: SelectSubset<T, ProfissionalDeleteArgs<ExtArgs>>): Prisma__ProfissionalClient<$Result.GetResult<Prisma.$ProfissionalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Profissional.
     * @param {ProfissionalUpdateArgs} args - Arguments to update one Profissional.
     * @example
     * // Update one Profissional
     * const profissional = await prisma.profissional.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfissionalUpdateArgs>(args: SelectSubset<T, ProfissionalUpdateArgs<ExtArgs>>): Prisma__ProfissionalClient<$Result.GetResult<Prisma.$ProfissionalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Profissionals.
     * @param {ProfissionalDeleteManyArgs} args - Arguments to filter Profissionals to delete.
     * @example
     * // Delete a few Profissionals
     * const { count } = await prisma.profissional.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfissionalDeleteManyArgs>(args?: SelectSubset<T, ProfissionalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profissionals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfissionalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profissionals
     * const profissional = await prisma.profissional.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfissionalUpdateManyArgs>(args: SelectSubset<T, ProfissionalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profissionals and returns the data updated in the database.
     * @param {ProfissionalUpdateManyAndReturnArgs} args - Arguments to update many Profissionals.
     * @example
     * // Update many Profissionals
     * const profissional = await prisma.profissional.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Profissionals and only return the `id`
     * const profissionalWithIdOnly = await prisma.profissional.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends ProfissionalUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfissionalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfissionalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Profissional.
     * @param {ProfissionalUpsertArgs} args - Arguments to update or create a Profissional.
     * @example
     * // Update or create a Profissional
     * const profissional = await prisma.profissional.upsert({
     *   create: {
     *     // ... data to create a Profissional
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profissional we want to update
     *   }
     * })
     */
    upsert<T extends ProfissionalUpsertArgs>(args: SelectSubset<T, ProfissionalUpsertArgs<ExtArgs>>): Prisma__ProfissionalClient<$Result.GetResult<Prisma.$ProfissionalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Profissionals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfissionalCountArgs} args - Arguments to filter Profissionals to count.
     * @example
     * // Count the number of Profissionals
     * const count = await prisma.profissional.count({
     *   where: {
     *     // ... the filter for the Profissionals we want to count
     *   }
     * })
    **/
    count<T extends ProfissionalCountArgs>(
      args?: Subset<T, ProfissionalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfissionalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profissional.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfissionalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProfissionalAggregateArgs>(args: Subset<T, ProfissionalAggregateArgs>): Prisma.PrismaPromise<GetProfissionalAggregateType<T>>

    /**
     * Group by Profissional.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfissionalGroupByArgs} args - Group by arguments.
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
      T extends ProfissionalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfissionalGroupByArgs['orderBy'] }
        : { orderBy?: ProfissionalGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProfissionalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfissionalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Profissional model
   */
  readonly fields: ProfissionalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Profissional.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfissionalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agendamentos<T extends Profissional$agendamentosArgs<ExtArgs> = {}>(args?: Subset<T, Profissional$agendamentosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgendamentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    atendimentos<T extends Profissional$atendimentosArgs<ExtArgs> = {}>(args?: Subset<T, Profissional$atendimentosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AtendimentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pacientes<T extends Profissional$pacientesArgs<ExtArgs> = {}>(args?: Subset<T, Profissional$pacientesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Profissional model
   */
  interface ProfissionalFieldRefs {
    readonly id: FieldRef<"Profissional", 'String'>
    readonly tenantId: FieldRef<"Profissional", 'String'>
    readonly nome: FieldRef<"Profissional", 'String'>
    readonly especialidade: FieldRef<"Profissional", 'String'>
    readonly observacoes: FieldRef<"Profissional", 'String'>
    readonly ativo: FieldRef<"Profissional", 'Boolean'>
    readonly createdAt: FieldRef<"Profissional", 'DateTime'>
    readonly updatedAt: FieldRef<"Profissional", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Profissional findUnique
   */
  export type ProfissionalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profissional
     */
    select?: ProfissionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profissional
     */
    omit?: ProfissionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfissionalInclude<ExtArgs> | null
    /**
     * Filter, which Profissional to fetch.
     */
    where: ProfissionalWhereUniqueInput
  }

  /**
   * Profissional findUniqueOrThrow
   */
  export type ProfissionalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profissional
     */
    select?: ProfissionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profissional
     */
    omit?: ProfissionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfissionalInclude<ExtArgs> | null
    /**
     * Filter, which Profissional to fetch.
     */
    where: ProfissionalWhereUniqueInput
  }

  /**
   * Profissional findFirst
   */
  export type ProfissionalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profissional
     */
    select?: ProfissionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profissional
     */
    omit?: ProfissionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfissionalInclude<ExtArgs> | null
    /**
     * Filter, which Profissional to fetch.
     */
    where?: ProfissionalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profissionals to fetch.
     */
    orderBy?: ProfissionalOrderByWithRelationInput | ProfissionalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profissionals.
     */
    cursor?: ProfissionalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profissionals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profissionals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profissionals.
     */
    distinct?: ProfissionalScalarFieldEnum | ProfissionalScalarFieldEnum[]
  }

  /**
   * Profissional findFirstOrThrow
   */
  export type ProfissionalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profissional
     */
    select?: ProfissionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profissional
     */
    omit?: ProfissionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfissionalInclude<ExtArgs> | null
    /**
     * Filter, which Profissional to fetch.
     */
    where?: ProfissionalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profissionals to fetch.
     */
    orderBy?: ProfissionalOrderByWithRelationInput | ProfissionalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profissionals.
     */
    cursor?: ProfissionalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profissionals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profissionals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profissionals.
     */
    distinct?: ProfissionalScalarFieldEnum | ProfissionalScalarFieldEnum[]
  }

  /**
   * Profissional findMany
   */
  export type ProfissionalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profissional
     */
    select?: ProfissionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profissional
     */
    omit?: ProfissionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfissionalInclude<ExtArgs> | null
    /**
     * Filter, which Profissionals to fetch.
     */
    where?: ProfissionalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profissionals to fetch.
     */
    orderBy?: ProfissionalOrderByWithRelationInput | ProfissionalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profissionals.
     */
    cursor?: ProfissionalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profissionals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profissionals.
     */
    skip?: number
    distinct?: ProfissionalScalarFieldEnum | ProfissionalScalarFieldEnum[]
  }

  /**
   * Profissional create
   */
  export type ProfissionalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profissional
     */
    select?: ProfissionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profissional
     */
    omit?: ProfissionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfissionalInclude<ExtArgs> | null
    /**
     * The data needed to create a Profissional.
     */
    data: XOR<ProfissionalCreateInput, ProfissionalUncheckedCreateInput>
  }

  /**
   * Profissional createMany
   */
  export type ProfissionalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Profissionals.
     */
    data: ProfissionalCreateManyInput | ProfissionalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profissional createManyAndReturn
   */
  export type ProfissionalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profissional
     */
    select?: ProfissionalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profissional
     */
    omit?: ProfissionalOmit<ExtArgs> | null
    /**
     * The data used to create many Profissionals.
     */
    data: ProfissionalCreateManyInput | ProfissionalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfissionalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Profissional update
   */
  export type ProfissionalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profissional
     */
    select?: ProfissionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profissional
     */
    omit?: ProfissionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfissionalInclude<ExtArgs> | null
    /**
     * The data needed to update a Profissional.
     */
    data: XOR<ProfissionalUpdateInput, ProfissionalUncheckedUpdateInput>
    /**
     * Choose, which Profissional to update.
     */
    where: ProfissionalWhereUniqueInput
  }

  /**
   * Profissional updateMany
   */
  export type ProfissionalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Profissionals.
     */
    data: XOR<ProfissionalUpdateManyMutationInput, ProfissionalUncheckedUpdateManyInput>
    /**
     * Filter which Profissionals to update
     */
    where?: ProfissionalWhereInput
    /**
     * Limit how many Profissionals to update.
     */
    limit?: number
  }

  /**
   * Profissional updateManyAndReturn
   */
  export type ProfissionalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profissional
     */
    select?: ProfissionalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profissional
     */
    omit?: ProfissionalOmit<ExtArgs> | null
    /**
     * The data used to update Profissionals.
     */
    data: XOR<ProfissionalUpdateManyMutationInput, ProfissionalUncheckedUpdateManyInput>
    /**
     * Filter which Profissionals to update
     */
    where?: ProfissionalWhereInput
    /**
     * Limit how many Profissionals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfissionalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Profissional upsert
   */
  export type ProfissionalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profissional
     */
    select?: ProfissionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profissional
     */
    omit?: ProfissionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfissionalInclude<ExtArgs> | null
    /**
     * The filter to search for the Profissional to update in case it exists.
     */
    where: ProfissionalWhereUniqueInput
    /**
     * In case the Profissional found by the `where` argument doesn't exist, create a new Profissional with this data.
     */
    create: XOR<ProfissionalCreateInput, ProfissionalUncheckedCreateInput>
    /**
     * In case the Profissional was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfissionalUpdateInput, ProfissionalUncheckedUpdateInput>
  }

  /**
   * Profissional delete
   */
  export type ProfissionalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profissional
     */
    select?: ProfissionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profissional
     */
    omit?: ProfissionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfissionalInclude<ExtArgs> | null
    /**
     * Filter which Profissional to delete.
     */
    where: ProfissionalWhereUniqueInput
  }

  /**
   * Profissional deleteMany
   */
  export type ProfissionalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profissionals to delete
     */
    where?: ProfissionalWhereInput
    /**
     * Limit how many Profissionals to delete.
     */
    limit?: number
  }

  /**
   * Profissional.agendamentos
   */
  export type Profissional$agendamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agendamento
     */
    select?: AgendamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agendamento
     */
    omit?: AgendamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendamentoInclude<ExtArgs> | null
    where?: AgendamentoWhereInput
    orderBy?: AgendamentoOrderByWithRelationInput | AgendamentoOrderByWithRelationInput[]
    cursor?: AgendamentoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgendamentoScalarFieldEnum | AgendamentoScalarFieldEnum[]
  }

  /**
   * Profissional.atendimentos
   */
  export type Profissional$atendimentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Atendimento
     */
    select?: AtendimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Atendimento
     */
    omit?: AtendimentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AtendimentoInclude<ExtArgs> | null
    where?: AtendimentoWhereInput
    orderBy?: AtendimentoOrderByWithRelationInput | AtendimentoOrderByWithRelationInput[]
    cursor?: AtendimentoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AtendimentoScalarFieldEnum | AtendimentoScalarFieldEnum[]
  }

  /**
   * Profissional.pacientes
   */
  export type Profissional$pacientesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paciente
     */
    select?: PacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Paciente
     */
    omit?: PacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacienteInclude<ExtArgs> | null
    where?: PacienteWhereInput
    orderBy?: PacienteOrderByWithRelationInput | PacienteOrderByWithRelationInput[]
    cursor?: PacienteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PacienteScalarFieldEnum | PacienteScalarFieldEnum[]
  }

  /**
   * Profissional without action
   */
  export type ProfissionalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profissional
     */
    select?: ProfissionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profissional
     */
    omit?: ProfissionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfissionalInclude<ExtArgs> | null
  }


  /**
   * Model Paciente
   */

  export type AggregatePaciente = {
    _count: PacienteCountAggregateOutputType | null
    _min: PacienteMinAggregateOutputType | null
    _max: PacienteMaxAggregateOutputType | null
  }

  export type PacienteMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    profissionalId: string | null
    nome: string | null
    telefone: string | null
    email: string | null
    observacoes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PacienteMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    profissionalId: string | null
    nome: string | null
    telefone: string | null
    email: string | null
    observacoes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PacienteCountAggregateOutputType = {
    id: number
    tenantId: number
    profissionalId: number
    nome: number
    telefone: number
    email: number
    observacoes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PacienteMinAggregateInputType = {
    id?: true
    tenantId?: true
    profissionalId?: true
    nome?: true
    telefone?: true
    email?: true
    observacoes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PacienteMaxAggregateInputType = {
    id?: true
    tenantId?: true
    profissionalId?: true
    nome?: true
    telefone?: true
    email?: true
    observacoes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PacienteCountAggregateInputType = {
    id?: true
    tenantId?: true
    profissionalId?: true
    nome?: true
    telefone?: true
    email?: true
    observacoes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PacienteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Paciente to aggregate.
     */
    where?: PacienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pacientes to fetch.
     */
    orderBy?: PacienteOrderByWithRelationInput | PacienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PacienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pacientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pacientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pacientes
    **/
    _count?: true | PacienteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PacienteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PacienteMaxAggregateInputType
  }

  export type GetPacienteAggregateType<T extends PacienteAggregateArgs> = {
        [P in keyof T & keyof AggregatePaciente]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePaciente[P]>
      : GetScalarType<T[P], AggregatePaciente[P]>
  }




  export type PacienteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PacienteWhereInput
    orderBy?: PacienteOrderByWithAggregationInput | PacienteOrderByWithAggregationInput[]
    by: PacienteScalarFieldEnum[] | PacienteScalarFieldEnum
    having?: PacienteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PacienteCountAggregateInputType | true
    _min?: PacienteMinAggregateInputType
    _max?: PacienteMaxAggregateInputType
  }

  export type PacienteGroupByOutputType = {
    id: string
    tenantId: string
    profissionalId: string | null
    nome: string
    telefone: string
    email: string | null
    observacoes: string | null
    createdAt: Date
    updatedAt: Date
    _count: PacienteCountAggregateOutputType | null
    _min: PacienteMinAggregateOutputType | null
    _max: PacienteMaxAggregateOutputType | null
  }

  type GetPacienteGroupByPayload<T extends PacienteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PacienteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PacienteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PacienteGroupByOutputType[P]>
            : GetScalarType<T[P], PacienteGroupByOutputType[P]>
        }
      >
    >


  export type PacienteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    profissionalId?: boolean
    nome?: boolean
    telefone?: boolean
    email?: boolean
    observacoes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    agendamentos?: boolean | Paciente$agendamentosArgs<ExtArgs>
    atendimentos?: boolean | Paciente$atendimentosArgs<ExtArgs>
    profissional?: boolean | Paciente$profissionalArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    _count?: boolean | PacienteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paciente"]>

  export type PacienteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    profissionalId?: boolean
    nome?: boolean
    telefone?: boolean
    email?: boolean
    observacoes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profissional?: boolean | Paciente$profissionalArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paciente"]>

  export type PacienteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    profissionalId?: boolean
    nome?: boolean
    telefone?: boolean
    email?: boolean
    observacoes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profissional?: boolean | Paciente$profissionalArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paciente"]>

  export type PacienteSelectScalar = {
    id?: boolean
    tenantId?: boolean
    profissionalId?: boolean
    nome?: boolean
    telefone?: boolean
    email?: boolean
    observacoes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PacienteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "profissionalId" | "nome" | "telefone" | "email" | "observacoes" | "createdAt" | "updatedAt", ExtArgs["result"]["paciente"]>
  export type PacienteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agendamentos?: boolean | Paciente$agendamentosArgs<ExtArgs>
    atendimentos?: boolean | Paciente$atendimentosArgs<ExtArgs>
    profissional?: boolean | Paciente$profissionalArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    _count?: boolean | PacienteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PacienteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profissional?: boolean | Paciente$profissionalArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type PacienteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profissional?: boolean | Paciente$profissionalArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $PacientePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Paciente"
    objects: {
      agendamentos: Prisma.$AgendamentoPayload<ExtArgs>[]
      atendimentos: Prisma.$AtendimentoPayload<ExtArgs>[]
      profissional: Prisma.$ProfissionalPayload<ExtArgs> | null
      tenant: Prisma.$TenantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      profissionalId: string | null
      nome: string
      telefone: string
      email: string | null
      observacoes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["paciente"]>
    composites: {}
  }

  type PacienteGetPayload<S extends boolean | null | undefined | PacienteDefaultArgs> = $Result.GetResult<Prisma.$PacientePayload, S>

  type PacienteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PacienteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PacienteCountAggregateInputType | true
    }

  export interface PacienteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Paciente'], meta: { name: 'Paciente' } }
    /**
     * Find zero or one Paciente that matches the filter.
     * @param {PacienteFindUniqueArgs} args - Arguments to find a Paciente
     * @example
     * // Get one Paciente
     * const paciente = await prisma.paciente.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PacienteFindUniqueArgs>(args: SelectSubset<T, PacienteFindUniqueArgs<ExtArgs>>): Prisma__PacienteClient<$Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Paciente that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PacienteFindUniqueOrThrowArgs} args - Arguments to find a Paciente
     * @example
     * // Get one Paciente
     * const paciente = await prisma.paciente.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PacienteFindUniqueOrThrowArgs>(args: SelectSubset<T, PacienteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PacienteClient<$Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Paciente that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PacienteFindFirstArgs} args - Arguments to find a Paciente
     * @example
     * // Get one Paciente
     * const paciente = await prisma.paciente.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PacienteFindFirstArgs>(args?: SelectSubset<T, PacienteFindFirstArgs<ExtArgs>>): Prisma__PacienteClient<$Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Paciente that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PacienteFindFirstOrThrowArgs} args - Arguments to find a Paciente
     * @example
     * // Get one Paciente
     * const paciente = await prisma.paciente.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PacienteFindFirstOrThrowArgs>(args?: SelectSubset<T, PacienteFindFirstOrThrowArgs<ExtArgs>>): Prisma__PacienteClient<$Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pacientes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PacienteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pacientes
     * const pacientes = await prisma.paciente.findMany()
     * 
     * // Get first 10 Pacientes
     * const pacientes = await prisma.paciente.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pacienteWithIdOnly = await prisma.paciente.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PacienteFindManyArgs>(args?: SelectSubset<T, PacienteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Paciente.
     * @param {PacienteCreateArgs} args - Arguments to create a Paciente.
     * @example
     * // Create one Paciente
     * const Paciente = await prisma.paciente.create({
     *   data: {
     *     // ... data to create a Paciente
     *   }
     * })
     * 
     */
    create<T extends PacienteCreateArgs>(args: SelectSubset<T, PacienteCreateArgs<ExtArgs>>): Prisma__PacienteClient<$Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pacientes.
     * @param {PacienteCreateManyArgs} args - Arguments to create many Pacientes.
     * @example
     * // Create many Pacientes
     * const paciente = await prisma.paciente.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PacienteCreateManyArgs>(args?: SelectSubset<T, PacienteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pacientes and returns the data saved in the database.
     * @param {PacienteCreateManyAndReturnArgs} args - Arguments to create many Pacientes.
     * @example
     * // Create many Pacientes
     * const paciente = await prisma.paciente.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pacientes and only return the `id`
     * const pacienteWithIdOnly = await prisma.paciente.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PacienteCreateManyAndReturnArgs>(args?: SelectSubset<T, PacienteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Paciente.
     * @param {PacienteDeleteArgs} args - Arguments to delete one Paciente.
     * @example
     * // Delete one Paciente
     * const Paciente = await prisma.paciente.delete({
     *   where: {
     *     // ... filter to delete one Paciente
     *   }
     * })
     * 
     */
    delete<T extends PacienteDeleteArgs>(args: SelectSubset<T, PacienteDeleteArgs<ExtArgs>>): Prisma__PacienteClient<$Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Paciente.
     * @param {PacienteUpdateArgs} args - Arguments to update one Paciente.
     * @example
     * // Update one Paciente
     * const paciente = await prisma.paciente.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PacienteUpdateArgs>(args: SelectSubset<T, PacienteUpdateArgs<ExtArgs>>): Prisma__PacienteClient<$Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pacientes.
     * @param {PacienteDeleteManyArgs} args - Arguments to filter Pacientes to delete.
     * @example
     * // Delete a few Pacientes
     * const { count } = await prisma.paciente.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PacienteDeleteManyArgs>(args?: SelectSubset<T, PacienteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pacientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PacienteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pacientes
     * const paciente = await prisma.paciente.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PacienteUpdateManyArgs>(args: SelectSubset<T, PacienteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pacientes and returns the data updated in the database.
     * @param {PacienteUpdateManyAndReturnArgs} args - Arguments to update many Pacientes.
     * @example
     * // Update many Pacientes
     * const paciente = await prisma.paciente.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pacientes and only return the `id`
     * const pacienteWithIdOnly = await prisma.paciente.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends PacienteUpdateManyAndReturnArgs>(args: SelectSubset<T, PacienteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Paciente.
     * @param {PacienteUpsertArgs} args - Arguments to update or create a Paciente.
     * @example
     * // Update or create a Paciente
     * const paciente = await prisma.paciente.upsert({
     *   create: {
     *     // ... data to create a Paciente
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Paciente we want to update
     *   }
     * })
     */
    upsert<T extends PacienteUpsertArgs>(args: SelectSubset<T, PacienteUpsertArgs<ExtArgs>>): Prisma__PacienteClient<$Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pacientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PacienteCountArgs} args - Arguments to filter Pacientes to count.
     * @example
     * // Count the number of Pacientes
     * const count = await prisma.paciente.count({
     *   where: {
     *     // ... the filter for the Pacientes we want to count
     *   }
     * })
    **/
    count<T extends PacienteCountArgs>(
      args?: Subset<T, PacienteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PacienteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Paciente.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PacienteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PacienteAggregateArgs>(args: Subset<T, PacienteAggregateArgs>): Prisma.PrismaPromise<GetPacienteAggregateType<T>>

    /**
     * Group by Paciente.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PacienteGroupByArgs} args - Group by arguments.
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
      T extends PacienteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PacienteGroupByArgs['orderBy'] }
        : { orderBy?: PacienteGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PacienteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPacienteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Paciente model
   */
  readonly fields: PacienteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Paciente.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PacienteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agendamentos<T extends Paciente$agendamentosArgs<ExtArgs> = {}>(args?: Subset<T, Paciente$agendamentosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgendamentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    atendimentos<T extends Paciente$atendimentosArgs<ExtArgs> = {}>(args?: Subset<T, Paciente$atendimentosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AtendimentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    profissional<T extends Paciente$profissionalArgs<ExtArgs> = {}>(args?: Subset<T, Paciente$profissionalArgs<ExtArgs>>): Prisma__ProfissionalClient<$Result.GetResult<Prisma.$ProfissionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Paciente model
   */
  interface PacienteFieldRefs {
    readonly id: FieldRef<"Paciente", 'String'>
    readonly tenantId: FieldRef<"Paciente", 'String'>
    readonly profissionalId: FieldRef<"Paciente", 'String'>
    readonly nome: FieldRef<"Paciente", 'String'>
    readonly telefone: FieldRef<"Paciente", 'String'>
    readonly email: FieldRef<"Paciente", 'String'>
    readonly observacoes: FieldRef<"Paciente", 'String'>
    readonly createdAt: FieldRef<"Paciente", 'DateTime'>
    readonly updatedAt: FieldRef<"Paciente", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Paciente findUnique
   */
  export type PacienteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paciente
     */
    select?: PacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Paciente
     */
    omit?: PacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacienteInclude<ExtArgs> | null
    /**
     * Filter, which Paciente to fetch.
     */
    where: PacienteWhereUniqueInput
  }

  /**
   * Paciente findUniqueOrThrow
   */
  export type PacienteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paciente
     */
    select?: PacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Paciente
     */
    omit?: PacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacienteInclude<ExtArgs> | null
    /**
     * Filter, which Paciente to fetch.
     */
    where: PacienteWhereUniqueInput
  }

  /**
   * Paciente findFirst
   */
  export type PacienteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paciente
     */
    select?: PacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Paciente
     */
    omit?: PacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacienteInclude<ExtArgs> | null
    /**
     * Filter, which Paciente to fetch.
     */
    where?: PacienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pacientes to fetch.
     */
    orderBy?: PacienteOrderByWithRelationInput | PacienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pacientes.
     */
    cursor?: PacienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pacientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pacientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pacientes.
     */
    distinct?: PacienteScalarFieldEnum | PacienteScalarFieldEnum[]
  }

  /**
   * Paciente findFirstOrThrow
   */
  export type PacienteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paciente
     */
    select?: PacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Paciente
     */
    omit?: PacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacienteInclude<ExtArgs> | null
    /**
     * Filter, which Paciente to fetch.
     */
    where?: PacienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pacientes to fetch.
     */
    orderBy?: PacienteOrderByWithRelationInput | PacienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pacientes.
     */
    cursor?: PacienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pacientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pacientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pacientes.
     */
    distinct?: PacienteScalarFieldEnum | PacienteScalarFieldEnum[]
  }

  /**
   * Paciente findMany
   */
  export type PacienteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paciente
     */
    select?: PacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Paciente
     */
    omit?: PacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacienteInclude<ExtArgs> | null
    /**
     * Filter, which Pacientes to fetch.
     */
    where?: PacienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pacientes to fetch.
     */
    orderBy?: PacienteOrderByWithRelationInput | PacienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pacientes.
     */
    cursor?: PacienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pacientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pacientes.
     */
    skip?: number
    distinct?: PacienteScalarFieldEnum | PacienteScalarFieldEnum[]
  }

  /**
   * Paciente create
   */
  export type PacienteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paciente
     */
    select?: PacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Paciente
     */
    omit?: PacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacienteInclude<ExtArgs> | null
    /**
     * The data needed to create a Paciente.
     */
    data: XOR<PacienteCreateInput, PacienteUncheckedCreateInput>
  }

  /**
   * Paciente createMany
   */
  export type PacienteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pacientes.
     */
    data: PacienteCreateManyInput | PacienteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Paciente createManyAndReturn
   */
  export type PacienteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paciente
     */
    select?: PacienteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Paciente
     */
    omit?: PacienteOmit<ExtArgs> | null
    /**
     * The data used to create many Pacientes.
     */
    data: PacienteCreateManyInput | PacienteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacienteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Paciente update
   */
  export type PacienteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paciente
     */
    select?: PacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Paciente
     */
    omit?: PacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacienteInclude<ExtArgs> | null
    /**
     * The data needed to update a Paciente.
     */
    data: XOR<PacienteUpdateInput, PacienteUncheckedUpdateInput>
    /**
     * Choose, which Paciente to update.
     */
    where: PacienteWhereUniqueInput
  }

  /**
   * Paciente updateMany
   */
  export type PacienteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pacientes.
     */
    data: XOR<PacienteUpdateManyMutationInput, PacienteUncheckedUpdateManyInput>
    /**
     * Filter which Pacientes to update
     */
    where?: PacienteWhereInput
    /**
     * Limit how many Pacientes to update.
     */
    limit?: number
  }

  /**
   * Paciente updateManyAndReturn
   */
  export type PacienteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paciente
     */
    select?: PacienteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Paciente
     */
    omit?: PacienteOmit<ExtArgs> | null
    /**
     * The data used to update Pacientes.
     */
    data: XOR<PacienteUpdateManyMutationInput, PacienteUncheckedUpdateManyInput>
    /**
     * Filter which Pacientes to update
     */
    where?: PacienteWhereInput
    /**
     * Limit how many Pacientes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacienteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Paciente upsert
   */
  export type PacienteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paciente
     */
    select?: PacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Paciente
     */
    omit?: PacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacienteInclude<ExtArgs> | null
    /**
     * The filter to search for the Paciente to update in case it exists.
     */
    where: PacienteWhereUniqueInput
    /**
     * In case the Paciente found by the `where` argument doesn't exist, create a new Paciente with this data.
     */
    create: XOR<PacienteCreateInput, PacienteUncheckedCreateInput>
    /**
     * In case the Paciente was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PacienteUpdateInput, PacienteUncheckedUpdateInput>
  }

  /**
   * Paciente delete
   */
  export type PacienteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paciente
     */
    select?: PacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Paciente
     */
    omit?: PacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacienteInclude<ExtArgs> | null
    /**
     * Filter which Paciente to delete.
     */
    where: PacienteWhereUniqueInput
  }

  /**
   * Paciente deleteMany
   */
  export type PacienteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pacientes to delete
     */
    where?: PacienteWhereInput
    /**
     * Limit how many Pacientes to delete.
     */
    limit?: number
  }

  /**
   * Paciente.agendamentos
   */
  export type Paciente$agendamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agendamento
     */
    select?: AgendamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agendamento
     */
    omit?: AgendamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendamentoInclude<ExtArgs> | null
    where?: AgendamentoWhereInput
    orderBy?: AgendamentoOrderByWithRelationInput | AgendamentoOrderByWithRelationInput[]
    cursor?: AgendamentoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgendamentoScalarFieldEnum | AgendamentoScalarFieldEnum[]
  }

  /**
   * Paciente.atendimentos
   */
  export type Paciente$atendimentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Atendimento
     */
    select?: AtendimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Atendimento
     */
    omit?: AtendimentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AtendimentoInclude<ExtArgs> | null
    where?: AtendimentoWhereInput
    orderBy?: AtendimentoOrderByWithRelationInput | AtendimentoOrderByWithRelationInput[]
    cursor?: AtendimentoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AtendimentoScalarFieldEnum | AtendimentoScalarFieldEnum[]
  }

  /**
   * Paciente.profissional
   */
  export type Paciente$profissionalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profissional
     */
    select?: ProfissionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profissional
     */
    omit?: ProfissionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfissionalInclude<ExtArgs> | null
    where?: ProfissionalWhereInput
  }

  /**
   * Paciente without action
   */
  export type PacienteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paciente
     */
    select?: PacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Paciente
     */
    omit?: PacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacienteInclude<ExtArgs> | null
  }


  /**
   * Model Procedimento
   */

  export type AggregateProcedimento = {
    _count: ProcedimentoCountAggregateOutputType | null
    _avg: ProcedimentoAvgAggregateOutputType | null
    _sum: ProcedimentoSumAggregateOutputType | null
    _min: ProcedimentoMinAggregateOutputType | null
    _max: ProcedimentoMaxAggregateOutputType | null
  }

  export type ProcedimentoAvgAggregateOutputType = {
    valor: Decimal | null
    duracaoMinutos: number | null
  }

  export type ProcedimentoSumAggregateOutputType = {
    valor: Decimal | null
    duracaoMinutos: number | null
  }

  export type ProcedimentoMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    nome: string | null
    valor: Decimal | null
    duracaoMinutos: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProcedimentoMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    nome: string | null
    valor: Decimal | null
    duracaoMinutos: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProcedimentoCountAggregateOutputType = {
    id: number
    tenantId: number
    nome: number
    valor: number
    duracaoMinutos: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProcedimentoAvgAggregateInputType = {
    valor?: true
    duracaoMinutos?: true
  }

  export type ProcedimentoSumAggregateInputType = {
    valor?: true
    duracaoMinutos?: true
  }

  export type ProcedimentoMinAggregateInputType = {
    id?: true
    tenantId?: true
    nome?: true
    valor?: true
    duracaoMinutos?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProcedimentoMaxAggregateInputType = {
    id?: true
    tenantId?: true
    nome?: true
    valor?: true
    duracaoMinutos?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProcedimentoCountAggregateInputType = {
    id?: true
    tenantId?: true
    nome?: true
    valor?: true
    duracaoMinutos?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProcedimentoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Procedimento to aggregate.
     */
    where?: ProcedimentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Procedimentos to fetch.
     */
    orderBy?: ProcedimentoOrderByWithRelationInput | ProcedimentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProcedimentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Procedimentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Procedimentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Procedimentos
    **/
    _count?: true | ProcedimentoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProcedimentoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProcedimentoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProcedimentoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProcedimentoMaxAggregateInputType
  }

  export type GetProcedimentoAggregateType<T extends ProcedimentoAggregateArgs> = {
        [P in keyof T & keyof AggregateProcedimento]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProcedimento[P]>
      : GetScalarType<T[P], AggregateProcedimento[P]>
  }




  export type ProcedimentoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProcedimentoWhereInput
    orderBy?: ProcedimentoOrderByWithAggregationInput | ProcedimentoOrderByWithAggregationInput[]
    by: ProcedimentoScalarFieldEnum[] | ProcedimentoScalarFieldEnum
    having?: ProcedimentoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProcedimentoCountAggregateInputType | true
    _avg?: ProcedimentoAvgAggregateInputType
    _sum?: ProcedimentoSumAggregateInputType
    _min?: ProcedimentoMinAggregateInputType
    _max?: ProcedimentoMaxAggregateInputType
  }

  export type ProcedimentoGroupByOutputType = {
    id: string
    tenantId: string
    nome: string
    valor: Decimal | null
    duracaoMinutos: number
    createdAt: Date
    updatedAt: Date
    _count: ProcedimentoCountAggregateOutputType | null
    _avg: ProcedimentoAvgAggregateOutputType | null
    _sum: ProcedimentoSumAggregateOutputType | null
    _min: ProcedimentoMinAggregateOutputType | null
    _max: ProcedimentoMaxAggregateOutputType | null
  }

  type GetProcedimentoGroupByPayload<T extends ProcedimentoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProcedimentoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProcedimentoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProcedimentoGroupByOutputType[P]>
            : GetScalarType<T[P], ProcedimentoGroupByOutputType[P]>
        }
      >
    >


  export type ProcedimentoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    nome?: boolean
    valor?: boolean
    duracaoMinutos?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    agendamentos?: boolean | Procedimento$agendamentosArgs<ExtArgs>
    atendimentos?: boolean | Procedimento$atendimentosArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    _count?: boolean | ProcedimentoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["procedimento"]>

  export type ProcedimentoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    nome?: boolean
    valor?: boolean
    duracaoMinutos?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["procedimento"]>

  export type ProcedimentoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    nome?: boolean
    valor?: boolean
    duracaoMinutos?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["procedimento"]>

  export type ProcedimentoSelectScalar = {
    id?: boolean
    tenantId?: boolean
    nome?: boolean
    valor?: boolean
    duracaoMinutos?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProcedimentoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "nome" | "valor" | "duracaoMinutos" | "createdAt" | "updatedAt", ExtArgs["result"]["procedimento"]>
  export type ProcedimentoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agendamentos?: boolean | Procedimento$agendamentosArgs<ExtArgs>
    atendimentos?: boolean | Procedimento$atendimentosArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    _count?: boolean | ProcedimentoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProcedimentoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type ProcedimentoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $ProcedimentoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Procedimento"
    objects: {
      agendamentos: Prisma.$AgendamentoPayload<ExtArgs>[]
      atendimentos: Prisma.$AtendimentoPayload<ExtArgs>[]
      tenant: Prisma.$TenantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      nome: string
      valor: Prisma.Decimal | null
      duracaoMinutos: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["procedimento"]>
    composites: {}
  }

  type ProcedimentoGetPayload<S extends boolean | null | undefined | ProcedimentoDefaultArgs> = $Result.GetResult<Prisma.$ProcedimentoPayload, S>

  type ProcedimentoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProcedimentoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProcedimentoCountAggregateInputType | true
    }

  export interface ProcedimentoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Procedimento'], meta: { name: 'Procedimento' } }
    /**
     * Find zero or one Procedimento that matches the filter.
     * @param {ProcedimentoFindUniqueArgs} args - Arguments to find a Procedimento
     * @example
     * // Get one Procedimento
     * const procedimento = await prisma.procedimento.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProcedimentoFindUniqueArgs>(args: SelectSubset<T, ProcedimentoFindUniqueArgs<ExtArgs>>): Prisma__ProcedimentoClient<$Result.GetResult<Prisma.$ProcedimentoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Procedimento that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProcedimentoFindUniqueOrThrowArgs} args - Arguments to find a Procedimento
     * @example
     * // Get one Procedimento
     * const procedimento = await prisma.procedimento.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProcedimentoFindUniqueOrThrowArgs>(args: SelectSubset<T, ProcedimentoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProcedimentoClient<$Result.GetResult<Prisma.$ProcedimentoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Procedimento that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcedimentoFindFirstArgs} args - Arguments to find a Procedimento
     * @example
     * // Get one Procedimento
     * const procedimento = await prisma.procedimento.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProcedimentoFindFirstArgs>(args?: SelectSubset<T, ProcedimentoFindFirstArgs<ExtArgs>>): Prisma__ProcedimentoClient<$Result.GetResult<Prisma.$ProcedimentoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Procedimento that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcedimentoFindFirstOrThrowArgs} args - Arguments to find a Procedimento
     * @example
     * // Get one Procedimento
     * const procedimento = await prisma.procedimento.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProcedimentoFindFirstOrThrowArgs>(args?: SelectSubset<T, ProcedimentoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProcedimentoClient<$Result.GetResult<Prisma.$ProcedimentoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Procedimentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcedimentoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Procedimentos
     * const procedimentos = await prisma.procedimento.findMany()
     * 
     * // Get first 10 Procedimentos
     * const procedimentos = await prisma.procedimento.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const procedimentoWithIdOnly = await prisma.procedimento.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProcedimentoFindManyArgs>(args?: SelectSubset<T, ProcedimentoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcedimentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Procedimento.
     * @param {ProcedimentoCreateArgs} args - Arguments to create a Procedimento.
     * @example
     * // Create one Procedimento
     * const Procedimento = await prisma.procedimento.create({
     *   data: {
     *     // ... data to create a Procedimento
     *   }
     * })
     * 
     */
    create<T extends ProcedimentoCreateArgs>(args: SelectSubset<T, ProcedimentoCreateArgs<ExtArgs>>): Prisma__ProcedimentoClient<$Result.GetResult<Prisma.$ProcedimentoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Procedimentos.
     * @param {ProcedimentoCreateManyArgs} args - Arguments to create many Procedimentos.
     * @example
     * // Create many Procedimentos
     * const procedimento = await prisma.procedimento.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProcedimentoCreateManyArgs>(args?: SelectSubset<T, ProcedimentoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Procedimentos and returns the data saved in the database.
     * @param {ProcedimentoCreateManyAndReturnArgs} args - Arguments to create many Procedimentos.
     * @example
     * // Create many Procedimentos
     * const procedimento = await prisma.procedimento.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Procedimentos and only return the `id`
     * const procedimentoWithIdOnly = await prisma.procedimento.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProcedimentoCreateManyAndReturnArgs>(args?: SelectSubset<T, ProcedimentoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcedimentoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Procedimento.
     * @param {ProcedimentoDeleteArgs} args - Arguments to delete one Procedimento.
     * @example
     * // Delete one Procedimento
     * const Procedimento = await prisma.procedimento.delete({
     *   where: {
     *     // ... filter to delete one Procedimento
     *   }
     * })
     * 
     */
    delete<T extends ProcedimentoDeleteArgs>(args: SelectSubset<T, ProcedimentoDeleteArgs<ExtArgs>>): Prisma__ProcedimentoClient<$Result.GetResult<Prisma.$ProcedimentoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Procedimento.
     * @param {ProcedimentoUpdateArgs} args - Arguments to update one Procedimento.
     * @example
     * // Update one Procedimento
     * const procedimento = await prisma.procedimento.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProcedimentoUpdateArgs>(args: SelectSubset<T, ProcedimentoUpdateArgs<ExtArgs>>): Prisma__ProcedimentoClient<$Result.GetResult<Prisma.$ProcedimentoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Procedimentos.
     * @param {ProcedimentoDeleteManyArgs} args - Arguments to filter Procedimentos to delete.
     * @example
     * // Delete a few Procedimentos
     * const { count } = await prisma.procedimento.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProcedimentoDeleteManyArgs>(args?: SelectSubset<T, ProcedimentoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Procedimentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcedimentoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Procedimentos
     * const procedimento = await prisma.procedimento.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProcedimentoUpdateManyArgs>(args: SelectSubset<T, ProcedimentoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Procedimentos and returns the data updated in the database.
     * @param {ProcedimentoUpdateManyAndReturnArgs} args - Arguments to update many Procedimentos.
     * @example
     * // Update many Procedimentos
     * const procedimento = await prisma.procedimento.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Procedimentos and only return the `id`
     * const procedimentoWithIdOnly = await prisma.procedimento.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends ProcedimentoUpdateManyAndReturnArgs>(args: SelectSubset<T, ProcedimentoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcedimentoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Procedimento.
     * @param {ProcedimentoUpsertArgs} args - Arguments to update or create a Procedimento.
     * @example
     * // Update or create a Procedimento
     * const procedimento = await prisma.procedimento.upsert({
     *   create: {
     *     // ... data to create a Procedimento
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Procedimento we want to update
     *   }
     * })
     */
    upsert<T extends ProcedimentoUpsertArgs>(args: SelectSubset<T, ProcedimentoUpsertArgs<ExtArgs>>): Prisma__ProcedimentoClient<$Result.GetResult<Prisma.$ProcedimentoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Procedimentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcedimentoCountArgs} args - Arguments to filter Procedimentos to count.
     * @example
     * // Count the number of Procedimentos
     * const count = await prisma.procedimento.count({
     *   where: {
     *     // ... the filter for the Procedimentos we want to count
     *   }
     * })
    **/
    count<T extends ProcedimentoCountArgs>(
      args?: Subset<T, ProcedimentoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProcedimentoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Procedimento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcedimentoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProcedimentoAggregateArgs>(args: Subset<T, ProcedimentoAggregateArgs>): Prisma.PrismaPromise<GetProcedimentoAggregateType<T>>

    /**
     * Group by Procedimento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcedimentoGroupByArgs} args - Group by arguments.
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
      T extends ProcedimentoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProcedimentoGroupByArgs['orderBy'] }
        : { orderBy?: ProcedimentoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProcedimentoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProcedimentoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Procedimento model
   */
  readonly fields: ProcedimentoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Procedimento.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProcedimentoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agendamentos<T extends Procedimento$agendamentosArgs<ExtArgs> = {}>(args?: Subset<T, Procedimento$agendamentosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgendamentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    atendimentos<T extends Procedimento$atendimentosArgs<ExtArgs> = {}>(args?: Subset<T, Procedimento$atendimentosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AtendimentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Procedimento model
   */
  interface ProcedimentoFieldRefs {
    readonly id: FieldRef<"Procedimento", 'String'>
    readonly tenantId: FieldRef<"Procedimento", 'String'>
    readonly nome: FieldRef<"Procedimento", 'String'>
    readonly valor: FieldRef<"Procedimento", 'Decimal'>
    readonly duracaoMinutos: FieldRef<"Procedimento", 'Int'>
    readonly createdAt: FieldRef<"Procedimento", 'DateTime'>
    readonly updatedAt: FieldRef<"Procedimento", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Procedimento findUnique
   */
  export type ProcedimentoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procedimento
     */
    select?: ProcedimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Procedimento
     */
    omit?: ProcedimentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcedimentoInclude<ExtArgs> | null
    /**
     * Filter, which Procedimento to fetch.
     */
    where: ProcedimentoWhereUniqueInput
  }

  /**
   * Procedimento findUniqueOrThrow
   */
  export type ProcedimentoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procedimento
     */
    select?: ProcedimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Procedimento
     */
    omit?: ProcedimentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcedimentoInclude<ExtArgs> | null
    /**
     * Filter, which Procedimento to fetch.
     */
    where: ProcedimentoWhereUniqueInput
  }

  /**
   * Procedimento findFirst
   */
  export type ProcedimentoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procedimento
     */
    select?: ProcedimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Procedimento
     */
    omit?: ProcedimentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcedimentoInclude<ExtArgs> | null
    /**
     * Filter, which Procedimento to fetch.
     */
    where?: ProcedimentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Procedimentos to fetch.
     */
    orderBy?: ProcedimentoOrderByWithRelationInput | ProcedimentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Procedimentos.
     */
    cursor?: ProcedimentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Procedimentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Procedimentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Procedimentos.
     */
    distinct?: ProcedimentoScalarFieldEnum | ProcedimentoScalarFieldEnum[]
  }

  /**
   * Procedimento findFirstOrThrow
   */
  export type ProcedimentoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procedimento
     */
    select?: ProcedimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Procedimento
     */
    omit?: ProcedimentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcedimentoInclude<ExtArgs> | null
    /**
     * Filter, which Procedimento to fetch.
     */
    where?: ProcedimentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Procedimentos to fetch.
     */
    orderBy?: ProcedimentoOrderByWithRelationInput | ProcedimentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Procedimentos.
     */
    cursor?: ProcedimentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Procedimentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Procedimentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Procedimentos.
     */
    distinct?: ProcedimentoScalarFieldEnum | ProcedimentoScalarFieldEnum[]
  }

  /**
   * Procedimento findMany
   */
  export type ProcedimentoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procedimento
     */
    select?: ProcedimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Procedimento
     */
    omit?: ProcedimentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcedimentoInclude<ExtArgs> | null
    /**
     * Filter, which Procedimentos to fetch.
     */
    where?: ProcedimentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Procedimentos to fetch.
     */
    orderBy?: ProcedimentoOrderByWithRelationInput | ProcedimentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Procedimentos.
     */
    cursor?: ProcedimentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Procedimentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Procedimentos.
     */
    skip?: number
    distinct?: ProcedimentoScalarFieldEnum | ProcedimentoScalarFieldEnum[]
  }

  /**
   * Procedimento create
   */
  export type ProcedimentoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procedimento
     */
    select?: ProcedimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Procedimento
     */
    omit?: ProcedimentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcedimentoInclude<ExtArgs> | null
    /**
     * The data needed to create a Procedimento.
     */
    data: XOR<ProcedimentoCreateInput, ProcedimentoUncheckedCreateInput>
  }

  /**
   * Procedimento createMany
   */
  export type ProcedimentoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Procedimentos.
     */
    data: ProcedimentoCreateManyInput | ProcedimentoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Procedimento createManyAndReturn
   */
  export type ProcedimentoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procedimento
     */
    select?: ProcedimentoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Procedimento
     */
    omit?: ProcedimentoOmit<ExtArgs> | null
    /**
     * The data used to create many Procedimentos.
     */
    data: ProcedimentoCreateManyInput | ProcedimentoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcedimentoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Procedimento update
   */
  export type ProcedimentoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procedimento
     */
    select?: ProcedimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Procedimento
     */
    omit?: ProcedimentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcedimentoInclude<ExtArgs> | null
    /**
     * The data needed to update a Procedimento.
     */
    data: XOR<ProcedimentoUpdateInput, ProcedimentoUncheckedUpdateInput>
    /**
     * Choose, which Procedimento to update.
     */
    where: ProcedimentoWhereUniqueInput
  }

  /**
   * Procedimento updateMany
   */
  export type ProcedimentoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Procedimentos.
     */
    data: XOR<ProcedimentoUpdateManyMutationInput, ProcedimentoUncheckedUpdateManyInput>
    /**
     * Filter which Procedimentos to update
     */
    where?: ProcedimentoWhereInput
    /**
     * Limit how many Procedimentos to update.
     */
    limit?: number
  }

  /**
   * Procedimento updateManyAndReturn
   */
  export type ProcedimentoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procedimento
     */
    select?: ProcedimentoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Procedimento
     */
    omit?: ProcedimentoOmit<ExtArgs> | null
    /**
     * The data used to update Procedimentos.
     */
    data: XOR<ProcedimentoUpdateManyMutationInput, ProcedimentoUncheckedUpdateManyInput>
    /**
     * Filter which Procedimentos to update
     */
    where?: ProcedimentoWhereInput
    /**
     * Limit how many Procedimentos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcedimentoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Procedimento upsert
   */
  export type ProcedimentoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procedimento
     */
    select?: ProcedimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Procedimento
     */
    omit?: ProcedimentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcedimentoInclude<ExtArgs> | null
    /**
     * The filter to search for the Procedimento to update in case it exists.
     */
    where: ProcedimentoWhereUniqueInput
    /**
     * In case the Procedimento found by the `where` argument doesn't exist, create a new Procedimento with this data.
     */
    create: XOR<ProcedimentoCreateInput, ProcedimentoUncheckedCreateInput>
    /**
     * In case the Procedimento was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProcedimentoUpdateInput, ProcedimentoUncheckedUpdateInput>
  }

  /**
   * Procedimento delete
   */
  export type ProcedimentoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procedimento
     */
    select?: ProcedimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Procedimento
     */
    omit?: ProcedimentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcedimentoInclude<ExtArgs> | null
    /**
     * Filter which Procedimento to delete.
     */
    where: ProcedimentoWhereUniqueInput
  }

  /**
   * Procedimento deleteMany
   */
  export type ProcedimentoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Procedimentos to delete
     */
    where?: ProcedimentoWhereInput
    /**
     * Limit how many Procedimentos to delete.
     */
    limit?: number
  }

  /**
   * Procedimento.agendamentos
   */
  export type Procedimento$agendamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agendamento
     */
    select?: AgendamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agendamento
     */
    omit?: AgendamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendamentoInclude<ExtArgs> | null
    where?: AgendamentoWhereInput
    orderBy?: AgendamentoOrderByWithRelationInput | AgendamentoOrderByWithRelationInput[]
    cursor?: AgendamentoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgendamentoScalarFieldEnum | AgendamentoScalarFieldEnum[]
  }

  /**
   * Procedimento.atendimentos
   */
  export type Procedimento$atendimentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Atendimento
     */
    select?: AtendimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Atendimento
     */
    omit?: AtendimentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AtendimentoInclude<ExtArgs> | null
    where?: AtendimentoWhereInput
    orderBy?: AtendimentoOrderByWithRelationInput | AtendimentoOrderByWithRelationInput[]
    cursor?: AtendimentoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AtendimentoScalarFieldEnum | AtendimentoScalarFieldEnum[]
  }

  /**
   * Procedimento without action
   */
  export type ProcedimentoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procedimento
     */
    select?: ProcedimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Procedimento
     */
    omit?: ProcedimentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcedimentoInclude<ExtArgs> | null
  }


  /**
   * Model Agendamento
   */

  export type AggregateAgendamento = {
    _count: AgendamentoCountAggregateOutputType | null
    _min: AgendamentoMinAggregateOutputType | null
    _max: AgendamentoMaxAggregateOutputType | null
  }

  export type AgendamentoMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    pacienteId: string | null
    profissionalId: string | null
    procedimentoId: string | null
    dataHora: Date | null
    status: $Enums.StatusAgendamento | null
    observacoes: string | null
    confirmacaoEnviada: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    dataHoraFim: Date | null
  }

  export type AgendamentoMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    pacienteId: string | null
    profissionalId: string | null
    procedimentoId: string | null
    dataHora: Date | null
    status: $Enums.StatusAgendamento | null
    observacoes: string | null
    confirmacaoEnviada: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    dataHoraFim: Date | null
  }

  export type AgendamentoCountAggregateOutputType = {
    id: number
    tenantId: number
    pacienteId: number
    profissionalId: number
    procedimentoId: number
    dataHora: number
    status: number
    observacoes: number
    confirmacaoEnviada: number
    createdAt: number
    updatedAt: number
    dataHoraFim: number
    _all: number
  }


  export type AgendamentoMinAggregateInputType = {
    id?: true
    tenantId?: true
    pacienteId?: true
    profissionalId?: true
    procedimentoId?: true
    dataHora?: true
    status?: true
    observacoes?: true
    confirmacaoEnviada?: true
    createdAt?: true
    updatedAt?: true
    dataHoraFim?: true
  }

  export type AgendamentoMaxAggregateInputType = {
    id?: true
    tenantId?: true
    pacienteId?: true
    profissionalId?: true
    procedimentoId?: true
    dataHora?: true
    status?: true
    observacoes?: true
    confirmacaoEnviada?: true
    createdAt?: true
    updatedAt?: true
    dataHoraFim?: true
  }

  export type AgendamentoCountAggregateInputType = {
    id?: true
    tenantId?: true
    pacienteId?: true
    profissionalId?: true
    procedimentoId?: true
    dataHora?: true
    status?: true
    observacoes?: true
    confirmacaoEnviada?: true
    createdAt?: true
    updatedAt?: true
    dataHoraFim?: true
    _all?: true
  }

  export type AgendamentoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Agendamento to aggregate.
     */
    where?: AgendamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agendamentos to fetch.
     */
    orderBy?: AgendamentoOrderByWithRelationInput | AgendamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgendamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agendamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agendamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Agendamentos
    **/
    _count?: true | AgendamentoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgendamentoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgendamentoMaxAggregateInputType
  }

  export type GetAgendamentoAggregateType<T extends AgendamentoAggregateArgs> = {
        [P in keyof T & keyof AggregateAgendamento]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgendamento[P]>
      : GetScalarType<T[P], AggregateAgendamento[P]>
  }




  export type AgendamentoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgendamentoWhereInput
    orderBy?: AgendamentoOrderByWithAggregationInput | AgendamentoOrderByWithAggregationInput[]
    by: AgendamentoScalarFieldEnum[] | AgendamentoScalarFieldEnum
    having?: AgendamentoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgendamentoCountAggregateInputType | true
    _min?: AgendamentoMinAggregateInputType
    _max?: AgendamentoMaxAggregateInputType
  }

  export type AgendamentoGroupByOutputType = {
    id: string
    tenantId: string
    pacienteId: string | null
    profissionalId: string
    procedimentoId: string
    dataHora: Date
    status: $Enums.StatusAgendamento
    observacoes: string | null
    confirmacaoEnviada: boolean
    createdAt: Date
    updatedAt: Date
    dataHoraFim: Date
    _count: AgendamentoCountAggregateOutputType | null
    _min: AgendamentoMinAggregateOutputType | null
    _max: AgendamentoMaxAggregateOutputType | null
  }

  type GetAgendamentoGroupByPayload<T extends AgendamentoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgendamentoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgendamentoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgendamentoGroupByOutputType[P]>
            : GetScalarType<T[P], AgendamentoGroupByOutputType[P]>
        }
      >
    >


  export type AgendamentoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    pacienteId?: boolean
    profissionalId?: boolean
    procedimentoId?: boolean
    dataHora?: boolean
    status?: boolean
    observacoes?: boolean
    confirmacaoEnviada?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dataHoraFim?: boolean
    paciente?: boolean | Agendamento$pacienteArgs<ExtArgs>
    procedimento?: boolean | ProcedimentoDefaultArgs<ExtArgs>
    profissional?: boolean | ProfissionalDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    atendimento?: boolean | Agendamento$atendimentoArgs<ExtArgs>
  }, ExtArgs["result"]["agendamento"]>

  export type AgendamentoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    pacienteId?: boolean
    profissionalId?: boolean
    procedimentoId?: boolean
    dataHora?: boolean
    status?: boolean
    observacoes?: boolean
    confirmacaoEnviada?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dataHoraFim?: boolean
    paciente?: boolean | Agendamento$pacienteArgs<ExtArgs>
    procedimento?: boolean | ProcedimentoDefaultArgs<ExtArgs>
    profissional?: boolean | ProfissionalDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agendamento"]>

  export type AgendamentoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    pacienteId?: boolean
    profissionalId?: boolean
    procedimentoId?: boolean
    dataHora?: boolean
    status?: boolean
    observacoes?: boolean
    confirmacaoEnviada?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dataHoraFim?: boolean
    paciente?: boolean | Agendamento$pacienteArgs<ExtArgs>
    procedimento?: boolean | ProcedimentoDefaultArgs<ExtArgs>
    profissional?: boolean | ProfissionalDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agendamento"]>

  export type AgendamentoSelectScalar = {
    id?: boolean
    tenantId?: boolean
    pacienteId?: boolean
    profissionalId?: boolean
    procedimentoId?: boolean
    dataHora?: boolean
    status?: boolean
    observacoes?: boolean
    confirmacaoEnviada?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dataHoraFim?: boolean
  }

  export type AgendamentoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "pacienteId" | "profissionalId" | "procedimentoId" | "dataHora" | "status" | "observacoes" | "confirmacaoEnviada" | "createdAt" | "updatedAt" | "dataHoraFim", ExtArgs["result"]["agendamento"]>
  export type AgendamentoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paciente?: boolean | Agendamento$pacienteArgs<ExtArgs>
    procedimento?: boolean | ProcedimentoDefaultArgs<ExtArgs>
    profissional?: boolean | ProfissionalDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    atendimento?: boolean | Agendamento$atendimentoArgs<ExtArgs>
  }
  export type AgendamentoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paciente?: boolean | Agendamento$pacienteArgs<ExtArgs>
    procedimento?: boolean | ProcedimentoDefaultArgs<ExtArgs>
    profissional?: boolean | ProfissionalDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type AgendamentoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paciente?: boolean | Agendamento$pacienteArgs<ExtArgs>
    procedimento?: boolean | ProcedimentoDefaultArgs<ExtArgs>
    profissional?: boolean | ProfissionalDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $AgendamentoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Agendamento"
    objects: {
      paciente: Prisma.$PacientePayload<ExtArgs> | null
      procedimento: Prisma.$ProcedimentoPayload<ExtArgs>
      profissional: Prisma.$ProfissionalPayload<ExtArgs>
      tenant: Prisma.$TenantPayload<ExtArgs>
      atendimento: Prisma.$AtendimentoPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      pacienteId: string | null
      profissionalId: string
      procedimentoId: string
      dataHora: Date
      status: $Enums.StatusAgendamento
      observacoes: string | null
      confirmacaoEnviada: boolean
      createdAt: Date
      updatedAt: Date
      dataHoraFim: Date
    }, ExtArgs["result"]["agendamento"]>
    composites: {}
  }

  type AgendamentoGetPayload<S extends boolean | null | undefined | AgendamentoDefaultArgs> = $Result.GetResult<Prisma.$AgendamentoPayload, S>

  type AgendamentoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AgendamentoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgendamentoCountAggregateInputType | true
    }

  export interface AgendamentoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Agendamento'], meta: { name: 'Agendamento' } }
    /**
     * Find zero or one Agendamento that matches the filter.
     * @param {AgendamentoFindUniqueArgs} args - Arguments to find a Agendamento
     * @example
     * // Get one Agendamento
     * const agendamento = await prisma.agendamento.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgendamentoFindUniqueArgs>(args: SelectSubset<T, AgendamentoFindUniqueArgs<ExtArgs>>): Prisma__AgendamentoClient<$Result.GetResult<Prisma.$AgendamentoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Agendamento that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AgendamentoFindUniqueOrThrowArgs} args - Arguments to find a Agendamento
     * @example
     * // Get one Agendamento
     * const agendamento = await prisma.agendamento.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgendamentoFindUniqueOrThrowArgs>(args: SelectSubset<T, AgendamentoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgendamentoClient<$Result.GetResult<Prisma.$AgendamentoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agendamento that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgendamentoFindFirstArgs} args - Arguments to find a Agendamento
     * @example
     * // Get one Agendamento
     * const agendamento = await prisma.agendamento.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgendamentoFindFirstArgs>(args?: SelectSubset<T, AgendamentoFindFirstArgs<ExtArgs>>): Prisma__AgendamentoClient<$Result.GetResult<Prisma.$AgendamentoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agendamento that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgendamentoFindFirstOrThrowArgs} args - Arguments to find a Agendamento
     * @example
     * // Get one Agendamento
     * const agendamento = await prisma.agendamento.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgendamentoFindFirstOrThrowArgs>(args?: SelectSubset<T, AgendamentoFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgendamentoClient<$Result.GetResult<Prisma.$AgendamentoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Agendamentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgendamentoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Agendamentos
     * const agendamentos = await prisma.agendamento.findMany()
     * 
     * // Get first 10 Agendamentos
     * const agendamentos = await prisma.agendamento.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agendamentoWithIdOnly = await prisma.agendamento.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgendamentoFindManyArgs>(args?: SelectSubset<T, AgendamentoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgendamentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Agendamento.
     * @param {AgendamentoCreateArgs} args - Arguments to create a Agendamento.
     * @example
     * // Create one Agendamento
     * const Agendamento = await prisma.agendamento.create({
     *   data: {
     *     // ... data to create a Agendamento
     *   }
     * })
     * 
     */
    create<T extends AgendamentoCreateArgs>(args: SelectSubset<T, AgendamentoCreateArgs<ExtArgs>>): Prisma__AgendamentoClient<$Result.GetResult<Prisma.$AgendamentoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Agendamentos.
     * @param {AgendamentoCreateManyArgs} args - Arguments to create many Agendamentos.
     * @example
     * // Create many Agendamentos
     * const agendamento = await prisma.agendamento.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgendamentoCreateManyArgs>(args?: SelectSubset<T, AgendamentoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Agendamentos and returns the data saved in the database.
     * @param {AgendamentoCreateManyAndReturnArgs} args - Arguments to create many Agendamentos.
     * @example
     * // Create many Agendamentos
     * const agendamento = await prisma.agendamento.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Agendamentos and only return the `id`
     * const agendamentoWithIdOnly = await prisma.agendamento.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgendamentoCreateManyAndReturnArgs>(args?: SelectSubset<T, AgendamentoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgendamentoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Agendamento.
     * @param {AgendamentoDeleteArgs} args - Arguments to delete one Agendamento.
     * @example
     * // Delete one Agendamento
     * const Agendamento = await prisma.agendamento.delete({
     *   where: {
     *     // ... filter to delete one Agendamento
     *   }
     * })
     * 
     */
    delete<T extends AgendamentoDeleteArgs>(args: SelectSubset<T, AgendamentoDeleteArgs<ExtArgs>>): Prisma__AgendamentoClient<$Result.GetResult<Prisma.$AgendamentoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Agendamento.
     * @param {AgendamentoUpdateArgs} args - Arguments to update one Agendamento.
     * @example
     * // Update one Agendamento
     * const agendamento = await prisma.agendamento.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgendamentoUpdateArgs>(args: SelectSubset<T, AgendamentoUpdateArgs<ExtArgs>>): Prisma__AgendamentoClient<$Result.GetResult<Prisma.$AgendamentoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Agendamentos.
     * @param {AgendamentoDeleteManyArgs} args - Arguments to filter Agendamentos to delete.
     * @example
     * // Delete a few Agendamentos
     * const { count } = await prisma.agendamento.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgendamentoDeleteManyArgs>(args?: SelectSubset<T, AgendamentoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agendamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgendamentoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Agendamentos
     * const agendamento = await prisma.agendamento.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgendamentoUpdateManyArgs>(args: SelectSubset<T, AgendamentoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agendamentos and returns the data updated in the database.
     * @param {AgendamentoUpdateManyAndReturnArgs} args - Arguments to update many Agendamentos.
     * @example
     * // Update many Agendamentos
     * const agendamento = await prisma.agendamento.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Agendamentos and only return the `id`
     * const agendamentoWithIdOnly = await prisma.agendamento.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends AgendamentoUpdateManyAndReturnArgs>(args: SelectSubset<T, AgendamentoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgendamentoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Agendamento.
     * @param {AgendamentoUpsertArgs} args - Arguments to update or create a Agendamento.
     * @example
     * // Update or create a Agendamento
     * const agendamento = await prisma.agendamento.upsert({
     *   create: {
     *     // ... data to create a Agendamento
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Agendamento we want to update
     *   }
     * })
     */
    upsert<T extends AgendamentoUpsertArgs>(args: SelectSubset<T, AgendamentoUpsertArgs<ExtArgs>>): Prisma__AgendamentoClient<$Result.GetResult<Prisma.$AgendamentoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Agendamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgendamentoCountArgs} args - Arguments to filter Agendamentos to count.
     * @example
     * // Count the number of Agendamentos
     * const count = await prisma.agendamento.count({
     *   where: {
     *     // ... the filter for the Agendamentos we want to count
     *   }
     * })
    **/
    count<T extends AgendamentoCountArgs>(
      args?: Subset<T, AgendamentoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgendamentoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Agendamento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgendamentoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AgendamentoAggregateArgs>(args: Subset<T, AgendamentoAggregateArgs>): Prisma.PrismaPromise<GetAgendamentoAggregateType<T>>

    /**
     * Group by Agendamento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgendamentoGroupByArgs} args - Group by arguments.
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
      T extends AgendamentoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgendamentoGroupByArgs['orderBy'] }
        : { orderBy?: AgendamentoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AgendamentoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgendamentoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Agendamento model
   */
  readonly fields: AgendamentoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Agendamento.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgendamentoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    paciente<T extends Agendamento$pacienteArgs<ExtArgs> = {}>(args?: Subset<T, Agendamento$pacienteArgs<ExtArgs>>): Prisma__PacienteClient<$Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    procedimento<T extends ProcedimentoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProcedimentoDefaultArgs<ExtArgs>>): Prisma__ProcedimentoClient<$Result.GetResult<Prisma.$ProcedimentoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    profissional<T extends ProfissionalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfissionalDefaultArgs<ExtArgs>>): Prisma__ProfissionalClient<$Result.GetResult<Prisma.$ProfissionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    atendimento<T extends Agendamento$atendimentoArgs<ExtArgs> = {}>(args?: Subset<T, Agendamento$atendimentoArgs<ExtArgs>>): Prisma__AtendimentoClient<$Result.GetResult<Prisma.$AtendimentoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Agendamento model
   */
  interface AgendamentoFieldRefs {
    readonly id: FieldRef<"Agendamento", 'String'>
    readonly tenantId: FieldRef<"Agendamento", 'String'>
    readonly pacienteId: FieldRef<"Agendamento", 'String'>
    readonly profissionalId: FieldRef<"Agendamento", 'String'>
    readonly procedimentoId: FieldRef<"Agendamento", 'String'>
    readonly dataHora: FieldRef<"Agendamento", 'DateTime'>
    readonly status: FieldRef<"Agendamento", 'StatusAgendamento'>
    readonly observacoes: FieldRef<"Agendamento", 'String'>
    readonly confirmacaoEnviada: FieldRef<"Agendamento", 'Boolean'>
    readonly createdAt: FieldRef<"Agendamento", 'DateTime'>
    readonly updatedAt: FieldRef<"Agendamento", 'DateTime'>
    readonly dataHoraFim: FieldRef<"Agendamento", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Agendamento findUnique
   */
  export type AgendamentoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agendamento
     */
    select?: AgendamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agendamento
     */
    omit?: AgendamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendamentoInclude<ExtArgs> | null
    /**
     * Filter, which Agendamento to fetch.
     */
    where: AgendamentoWhereUniqueInput
  }

  /**
   * Agendamento findUniqueOrThrow
   */
  export type AgendamentoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agendamento
     */
    select?: AgendamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agendamento
     */
    omit?: AgendamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendamentoInclude<ExtArgs> | null
    /**
     * Filter, which Agendamento to fetch.
     */
    where: AgendamentoWhereUniqueInput
  }

  /**
   * Agendamento findFirst
   */
  export type AgendamentoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agendamento
     */
    select?: AgendamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agendamento
     */
    omit?: AgendamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendamentoInclude<ExtArgs> | null
    /**
     * Filter, which Agendamento to fetch.
     */
    where?: AgendamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agendamentos to fetch.
     */
    orderBy?: AgendamentoOrderByWithRelationInput | AgendamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Agendamentos.
     */
    cursor?: AgendamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agendamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agendamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agendamentos.
     */
    distinct?: AgendamentoScalarFieldEnum | AgendamentoScalarFieldEnum[]
  }

  /**
   * Agendamento findFirstOrThrow
   */
  export type AgendamentoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agendamento
     */
    select?: AgendamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agendamento
     */
    omit?: AgendamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendamentoInclude<ExtArgs> | null
    /**
     * Filter, which Agendamento to fetch.
     */
    where?: AgendamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agendamentos to fetch.
     */
    orderBy?: AgendamentoOrderByWithRelationInput | AgendamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Agendamentos.
     */
    cursor?: AgendamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agendamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agendamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agendamentos.
     */
    distinct?: AgendamentoScalarFieldEnum | AgendamentoScalarFieldEnum[]
  }

  /**
   * Agendamento findMany
   */
  export type AgendamentoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agendamento
     */
    select?: AgendamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agendamento
     */
    omit?: AgendamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendamentoInclude<ExtArgs> | null
    /**
     * Filter, which Agendamentos to fetch.
     */
    where?: AgendamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agendamentos to fetch.
     */
    orderBy?: AgendamentoOrderByWithRelationInput | AgendamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Agendamentos.
     */
    cursor?: AgendamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agendamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agendamentos.
     */
    skip?: number
    distinct?: AgendamentoScalarFieldEnum | AgendamentoScalarFieldEnum[]
  }

  /**
   * Agendamento create
   */
  export type AgendamentoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agendamento
     */
    select?: AgendamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agendamento
     */
    omit?: AgendamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendamentoInclude<ExtArgs> | null
    /**
     * The data needed to create a Agendamento.
     */
    data: XOR<AgendamentoCreateInput, AgendamentoUncheckedCreateInput>
  }

  /**
   * Agendamento createMany
   */
  export type AgendamentoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Agendamentos.
     */
    data: AgendamentoCreateManyInput | AgendamentoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Agendamento createManyAndReturn
   */
  export type AgendamentoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agendamento
     */
    select?: AgendamentoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Agendamento
     */
    omit?: AgendamentoOmit<ExtArgs> | null
    /**
     * The data used to create many Agendamentos.
     */
    data: AgendamentoCreateManyInput | AgendamentoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendamentoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Agendamento update
   */
  export type AgendamentoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agendamento
     */
    select?: AgendamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agendamento
     */
    omit?: AgendamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendamentoInclude<ExtArgs> | null
    /**
     * The data needed to update a Agendamento.
     */
    data: XOR<AgendamentoUpdateInput, AgendamentoUncheckedUpdateInput>
    /**
     * Choose, which Agendamento to update.
     */
    where: AgendamentoWhereUniqueInput
  }

  /**
   * Agendamento updateMany
   */
  export type AgendamentoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Agendamentos.
     */
    data: XOR<AgendamentoUpdateManyMutationInput, AgendamentoUncheckedUpdateManyInput>
    /**
     * Filter which Agendamentos to update
     */
    where?: AgendamentoWhereInput
    /**
     * Limit how many Agendamentos to update.
     */
    limit?: number
  }

  /**
   * Agendamento updateManyAndReturn
   */
  export type AgendamentoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agendamento
     */
    select?: AgendamentoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Agendamento
     */
    omit?: AgendamentoOmit<ExtArgs> | null
    /**
     * The data used to update Agendamentos.
     */
    data: XOR<AgendamentoUpdateManyMutationInput, AgendamentoUncheckedUpdateManyInput>
    /**
     * Filter which Agendamentos to update
     */
    where?: AgendamentoWhereInput
    /**
     * Limit how many Agendamentos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendamentoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Agendamento upsert
   */
  export type AgendamentoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agendamento
     */
    select?: AgendamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agendamento
     */
    omit?: AgendamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendamentoInclude<ExtArgs> | null
    /**
     * The filter to search for the Agendamento to update in case it exists.
     */
    where: AgendamentoWhereUniqueInput
    /**
     * In case the Agendamento found by the `where` argument doesn't exist, create a new Agendamento with this data.
     */
    create: XOR<AgendamentoCreateInput, AgendamentoUncheckedCreateInput>
    /**
     * In case the Agendamento was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgendamentoUpdateInput, AgendamentoUncheckedUpdateInput>
  }

  /**
   * Agendamento delete
   */
  export type AgendamentoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agendamento
     */
    select?: AgendamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agendamento
     */
    omit?: AgendamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendamentoInclude<ExtArgs> | null
    /**
     * Filter which Agendamento to delete.
     */
    where: AgendamentoWhereUniqueInput
  }

  /**
   * Agendamento deleteMany
   */
  export type AgendamentoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Agendamentos to delete
     */
    where?: AgendamentoWhereInput
    /**
     * Limit how many Agendamentos to delete.
     */
    limit?: number
  }

  /**
   * Agendamento.paciente
   */
  export type Agendamento$pacienteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paciente
     */
    select?: PacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Paciente
     */
    omit?: PacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacienteInclude<ExtArgs> | null
    where?: PacienteWhereInput
  }

  /**
   * Agendamento.atendimento
   */
  export type Agendamento$atendimentoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Atendimento
     */
    select?: AtendimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Atendimento
     */
    omit?: AtendimentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AtendimentoInclude<ExtArgs> | null
    where?: AtendimentoWhereInput
  }

  /**
   * Agendamento without action
   */
  export type AgendamentoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agendamento
     */
    select?: AgendamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agendamento
     */
    omit?: AgendamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendamentoInclude<ExtArgs> | null
  }


  /**
   * Model Atendimento
   */

  export type AggregateAtendimento = {
    _count: AtendimentoCountAggregateOutputType | null
    _min: AtendimentoMinAggregateOutputType | null
    _max: AtendimentoMaxAggregateOutputType | null
  }

  export type AtendimentoMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    agendamentoId: string | null
    pacienteId: string | null
    profissionalId: string | null
    procedimentoId: string | null
    anotacoes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AtendimentoMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    agendamentoId: string | null
    pacienteId: string | null
    profissionalId: string | null
    procedimentoId: string | null
    anotacoes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AtendimentoCountAggregateOutputType = {
    id: number
    tenantId: number
    agendamentoId: number
    pacienteId: number
    profissionalId: number
    procedimentoId: number
    anotacoes: number
    procedimentosRealizados: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AtendimentoMinAggregateInputType = {
    id?: true
    tenantId?: true
    agendamentoId?: true
    pacienteId?: true
    profissionalId?: true
    procedimentoId?: true
    anotacoes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AtendimentoMaxAggregateInputType = {
    id?: true
    tenantId?: true
    agendamentoId?: true
    pacienteId?: true
    profissionalId?: true
    procedimentoId?: true
    anotacoes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AtendimentoCountAggregateInputType = {
    id?: true
    tenantId?: true
    agendamentoId?: true
    pacienteId?: true
    profissionalId?: true
    procedimentoId?: true
    anotacoes?: true
    procedimentosRealizados?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AtendimentoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Atendimento to aggregate.
     */
    where?: AtendimentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Atendimentos to fetch.
     */
    orderBy?: AtendimentoOrderByWithRelationInput | AtendimentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AtendimentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Atendimentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Atendimentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Atendimentos
    **/
    _count?: true | AtendimentoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AtendimentoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AtendimentoMaxAggregateInputType
  }

  export type GetAtendimentoAggregateType<T extends AtendimentoAggregateArgs> = {
        [P in keyof T & keyof AggregateAtendimento]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAtendimento[P]>
      : GetScalarType<T[P], AggregateAtendimento[P]>
  }




  export type AtendimentoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AtendimentoWhereInput
    orderBy?: AtendimentoOrderByWithAggregationInput | AtendimentoOrderByWithAggregationInput[]
    by: AtendimentoScalarFieldEnum[] | AtendimentoScalarFieldEnum
    having?: AtendimentoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AtendimentoCountAggregateInputType | true
    _min?: AtendimentoMinAggregateInputType
    _max?: AtendimentoMaxAggregateInputType
  }

  export type AtendimentoGroupByOutputType = {
    id: string
    tenantId: string
    agendamentoId: string
    pacienteId: string
    profissionalId: string
    procedimentoId: string
    anotacoes: string | null
    procedimentosRealizados: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: AtendimentoCountAggregateOutputType | null
    _min: AtendimentoMinAggregateOutputType | null
    _max: AtendimentoMaxAggregateOutputType | null
  }

  type GetAtendimentoGroupByPayload<T extends AtendimentoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AtendimentoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AtendimentoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AtendimentoGroupByOutputType[P]>
            : GetScalarType<T[P], AtendimentoGroupByOutputType[P]>
        }
      >
    >


  export type AtendimentoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    agendamentoId?: boolean
    pacienteId?: boolean
    profissionalId?: boolean
    procedimentoId?: boolean
    anotacoes?: boolean
    procedimentosRealizados?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    agendamento?: boolean | AgendamentoDefaultArgs<ExtArgs>
    paciente?: boolean | PacienteDefaultArgs<ExtArgs>
    procedimento?: boolean | ProcedimentoDefaultArgs<ExtArgs>
    profissional?: boolean | ProfissionalDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["atendimento"]>

  export type AtendimentoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    agendamentoId?: boolean
    pacienteId?: boolean
    profissionalId?: boolean
    procedimentoId?: boolean
    anotacoes?: boolean
    procedimentosRealizados?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    agendamento?: boolean | AgendamentoDefaultArgs<ExtArgs>
    paciente?: boolean | PacienteDefaultArgs<ExtArgs>
    procedimento?: boolean | ProcedimentoDefaultArgs<ExtArgs>
    profissional?: boolean | ProfissionalDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["atendimento"]>

  export type AtendimentoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    agendamentoId?: boolean
    pacienteId?: boolean
    profissionalId?: boolean
    procedimentoId?: boolean
    anotacoes?: boolean
    procedimentosRealizados?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    agendamento?: boolean | AgendamentoDefaultArgs<ExtArgs>
    paciente?: boolean | PacienteDefaultArgs<ExtArgs>
    procedimento?: boolean | ProcedimentoDefaultArgs<ExtArgs>
    profissional?: boolean | ProfissionalDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["atendimento"]>

  export type AtendimentoSelectScalar = {
    id?: boolean
    tenantId?: boolean
    agendamentoId?: boolean
    pacienteId?: boolean
    profissionalId?: boolean
    procedimentoId?: boolean
    anotacoes?: boolean
    procedimentosRealizados?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AtendimentoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "agendamentoId" | "pacienteId" | "profissionalId" | "procedimentoId" | "anotacoes" | "procedimentosRealizados" | "createdAt" | "updatedAt", ExtArgs["result"]["atendimento"]>
  export type AtendimentoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agendamento?: boolean | AgendamentoDefaultArgs<ExtArgs>
    paciente?: boolean | PacienteDefaultArgs<ExtArgs>
    procedimento?: boolean | ProcedimentoDefaultArgs<ExtArgs>
    profissional?: boolean | ProfissionalDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type AtendimentoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agendamento?: boolean | AgendamentoDefaultArgs<ExtArgs>
    paciente?: boolean | PacienteDefaultArgs<ExtArgs>
    procedimento?: boolean | ProcedimentoDefaultArgs<ExtArgs>
    profissional?: boolean | ProfissionalDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type AtendimentoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agendamento?: boolean | AgendamentoDefaultArgs<ExtArgs>
    paciente?: boolean | PacienteDefaultArgs<ExtArgs>
    procedimento?: boolean | ProcedimentoDefaultArgs<ExtArgs>
    profissional?: boolean | ProfissionalDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $AtendimentoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Atendimento"
    objects: {
      agendamento: Prisma.$AgendamentoPayload<ExtArgs>
      paciente: Prisma.$PacientePayload<ExtArgs>
      procedimento: Prisma.$ProcedimentoPayload<ExtArgs>
      profissional: Prisma.$ProfissionalPayload<ExtArgs>
      tenant: Prisma.$TenantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      agendamentoId: string
      pacienteId: string
      profissionalId: string
      procedimentoId: string
      anotacoes: string | null
      procedimentosRealizados: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["atendimento"]>
    composites: {}
  }

  type AtendimentoGetPayload<S extends boolean | null | undefined | AtendimentoDefaultArgs> = $Result.GetResult<Prisma.$AtendimentoPayload, S>

  type AtendimentoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AtendimentoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AtendimentoCountAggregateInputType | true
    }

  export interface AtendimentoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Atendimento'], meta: { name: 'Atendimento' } }
    /**
     * Find zero or one Atendimento that matches the filter.
     * @param {AtendimentoFindUniqueArgs} args - Arguments to find a Atendimento
     * @example
     * // Get one Atendimento
     * const atendimento = await prisma.atendimento.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AtendimentoFindUniqueArgs>(args: SelectSubset<T, AtendimentoFindUniqueArgs<ExtArgs>>): Prisma__AtendimentoClient<$Result.GetResult<Prisma.$AtendimentoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Atendimento that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AtendimentoFindUniqueOrThrowArgs} args - Arguments to find a Atendimento
     * @example
     * // Get one Atendimento
     * const atendimento = await prisma.atendimento.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AtendimentoFindUniqueOrThrowArgs>(args: SelectSubset<T, AtendimentoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AtendimentoClient<$Result.GetResult<Prisma.$AtendimentoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Atendimento that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AtendimentoFindFirstArgs} args - Arguments to find a Atendimento
     * @example
     * // Get one Atendimento
     * const atendimento = await prisma.atendimento.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AtendimentoFindFirstArgs>(args?: SelectSubset<T, AtendimentoFindFirstArgs<ExtArgs>>): Prisma__AtendimentoClient<$Result.GetResult<Prisma.$AtendimentoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Atendimento that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AtendimentoFindFirstOrThrowArgs} args - Arguments to find a Atendimento
     * @example
     * // Get one Atendimento
     * const atendimento = await prisma.atendimento.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AtendimentoFindFirstOrThrowArgs>(args?: SelectSubset<T, AtendimentoFindFirstOrThrowArgs<ExtArgs>>): Prisma__AtendimentoClient<$Result.GetResult<Prisma.$AtendimentoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Atendimentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AtendimentoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Atendimentos
     * const atendimentos = await prisma.atendimento.findMany()
     * 
     * // Get first 10 Atendimentos
     * const atendimentos = await prisma.atendimento.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const atendimentoWithIdOnly = await prisma.atendimento.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AtendimentoFindManyArgs>(args?: SelectSubset<T, AtendimentoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AtendimentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Atendimento.
     * @param {AtendimentoCreateArgs} args - Arguments to create a Atendimento.
     * @example
     * // Create one Atendimento
     * const Atendimento = await prisma.atendimento.create({
     *   data: {
     *     // ... data to create a Atendimento
     *   }
     * })
     * 
     */
    create<T extends AtendimentoCreateArgs>(args: SelectSubset<T, AtendimentoCreateArgs<ExtArgs>>): Prisma__AtendimentoClient<$Result.GetResult<Prisma.$AtendimentoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Atendimentos.
     * @param {AtendimentoCreateManyArgs} args - Arguments to create many Atendimentos.
     * @example
     * // Create many Atendimentos
     * const atendimento = await prisma.atendimento.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AtendimentoCreateManyArgs>(args?: SelectSubset<T, AtendimentoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Atendimentos and returns the data saved in the database.
     * @param {AtendimentoCreateManyAndReturnArgs} args - Arguments to create many Atendimentos.
     * @example
     * // Create many Atendimentos
     * const atendimento = await prisma.atendimento.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Atendimentos and only return the `id`
     * const atendimentoWithIdOnly = await prisma.atendimento.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AtendimentoCreateManyAndReturnArgs>(args?: SelectSubset<T, AtendimentoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AtendimentoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Atendimento.
     * @param {AtendimentoDeleteArgs} args - Arguments to delete one Atendimento.
     * @example
     * // Delete one Atendimento
     * const Atendimento = await prisma.atendimento.delete({
     *   where: {
     *     // ... filter to delete one Atendimento
     *   }
     * })
     * 
     */
    delete<T extends AtendimentoDeleteArgs>(args: SelectSubset<T, AtendimentoDeleteArgs<ExtArgs>>): Prisma__AtendimentoClient<$Result.GetResult<Prisma.$AtendimentoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Atendimento.
     * @param {AtendimentoUpdateArgs} args - Arguments to update one Atendimento.
     * @example
     * // Update one Atendimento
     * const atendimento = await prisma.atendimento.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AtendimentoUpdateArgs>(args: SelectSubset<T, AtendimentoUpdateArgs<ExtArgs>>): Prisma__AtendimentoClient<$Result.GetResult<Prisma.$AtendimentoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Atendimentos.
     * @param {AtendimentoDeleteManyArgs} args - Arguments to filter Atendimentos to delete.
     * @example
     * // Delete a few Atendimentos
     * const { count } = await prisma.atendimento.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AtendimentoDeleteManyArgs>(args?: SelectSubset<T, AtendimentoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Atendimentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AtendimentoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Atendimentos
     * const atendimento = await prisma.atendimento.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AtendimentoUpdateManyArgs>(args: SelectSubset<T, AtendimentoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Atendimentos and returns the data updated in the database.
     * @param {AtendimentoUpdateManyAndReturnArgs} args - Arguments to update many Atendimentos.
     * @example
     * // Update many Atendimentos
     * const atendimento = await prisma.atendimento.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Atendimentos and only return the `id`
     * const atendimentoWithIdOnly = await prisma.atendimento.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends AtendimentoUpdateManyAndReturnArgs>(args: SelectSubset<T, AtendimentoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AtendimentoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Atendimento.
     * @param {AtendimentoUpsertArgs} args - Arguments to update or create a Atendimento.
     * @example
     * // Update or create a Atendimento
     * const atendimento = await prisma.atendimento.upsert({
     *   create: {
     *     // ... data to create a Atendimento
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Atendimento we want to update
     *   }
     * })
     */
    upsert<T extends AtendimentoUpsertArgs>(args: SelectSubset<T, AtendimentoUpsertArgs<ExtArgs>>): Prisma__AtendimentoClient<$Result.GetResult<Prisma.$AtendimentoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Atendimentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AtendimentoCountArgs} args - Arguments to filter Atendimentos to count.
     * @example
     * // Count the number of Atendimentos
     * const count = await prisma.atendimento.count({
     *   where: {
     *     // ... the filter for the Atendimentos we want to count
     *   }
     * })
    **/
    count<T extends AtendimentoCountArgs>(
      args?: Subset<T, AtendimentoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AtendimentoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Atendimento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AtendimentoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AtendimentoAggregateArgs>(args: Subset<T, AtendimentoAggregateArgs>): Prisma.PrismaPromise<GetAtendimentoAggregateType<T>>

    /**
     * Group by Atendimento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AtendimentoGroupByArgs} args - Group by arguments.
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
      T extends AtendimentoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AtendimentoGroupByArgs['orderBy'] }
        : { orderBy?: AtendimentoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AtendimentoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAtendimentoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Atendimento model
   */
  readonly fields: AtendimentoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Atendimento.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AtendimentoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agendamento<T extends AgendamentoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgendamentoDefaultArgs<ExtArgs>>): Prisma__AgendamentoClient<$Result.GetResult<Prisma.$AgendamentoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    paciente<T extends PacienteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PacienteDefaultArgs<ExtArgs>>): Prisma__PacienteClient<$Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    procedimento<T extends ProcedimentoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProcedimentoDefaultArgs<ExtArgs>>): Prisma__ProcedimentoClient<$Result.GetResult<Prisma.$ProcedimentoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    profissional<T extends ProfissionalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfissionalDefaultArgs<ExtArgs>>): Prisma__ProfissionalClient<$Result.GetResult<Prisma.$ProfissionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Atendimento model
   */
  interface AtendimentoFieldRefs {
    readonly id: FieldRef<"Atendimento", 'String'>
    readonly tenantId: FieldRef<"Atendimento", 'String'>
    readonly agendamentoId: FieldRef<"Atendimento", 'String'>
    readonly pacienteId: FieldRef<"Atendimento", 'String'>
    readonly profissionalId: FieldRef<"Atendimento", 'String'>
    readonly procedimentoId: FieldRef<"Atendimento", 'String'>
    readonly anotacoes: FieldRef<"Atendimento", 'String'>
    readonly procedimentosRealizados: FieldRef<"Atendimento", 'Json'>
    readonly createdAt: FieldRef<"Atendimento", 'DateTime'>
    readonly updatedAt: FieldRef<"Atendimento", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Atendimento findUnique
   */
  export type AtendimentoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Atendimento
     */
    select?: AtendimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Atendimento
     */
    omit?: AtendimentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AtendimentoInclude<ExtArgs> | null
    /**
     * Filter, which Atendimento to fetch.
     */
    where: AtendimentoWhereUniqueInput
  }

  /**
   * Atendimento findUniqueOrThrow
   */
  export type AtendimentoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Atendimento
     */
    select?: AtendimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Atendimento
     */
    omit?: AtendimentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AtendimentoInclude<ExtArgs> | null
    /**
     * Filter, which Atendimento to fetch.
     */
    where: AtendimentoWhereUniqueInput
  }

  /**
   * Atendimento findFirst
   */
  export type AtendimentoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Atendimento
     */
    select?: AtendimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Atendimento
     */
    omit?: AtendimentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AtendimentoInclude<ExtArgs> | null
    /**
     * Filter, which Atendimento to fetch.
     */
    where?: AtendimentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Atendimentos to fetch.
     */
    orderBy?: AtendimentoOrderByWithRelationInput | AtendimentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Atendimentos.
     */
    cursor?: AtendimentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Atendimentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Atendimentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Atendimentos.
     */
    distinct?: AtendimentoScalarFieldEnum | AtendimentoScalarFieldEnum[]
  }

  /**
   * Atendimento findFirstOrThrow
   */
  export type AtendimentoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Atendimento
     */
    select?: AtendimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Atendimento
     */
    omit?: AtendimentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AtendimentoInclude<ExtArgs> | null
    /**
     * Filter, which Atendimento to fetch.
     */
    where?: AtendimentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Atendimentos to fetch.
     */
    orderBy?: AtendimentoOrderByWithRelationInput | AtendimentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Atendimentos.
     */
    cursor?: AtendimentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Atendimentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Atendimentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Atendimentos.
     */
    distinct?: AtendimentoScalarFieldEnum | AtendimentoScalarFieldEnum[]
  }

  /**
   * Atendimento findMany
   */
  export type AtendimentoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Atendimento
     */
    select?: AtendimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Atendimento
     */
    omit?: AtendimentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AtendimentoInclude<ExtArgs> | null
    /**
     * Filter, which Atendimentos to fetch.
     */
    where?: AtendimentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Atendimentos to fetch.
     */
    orderBy?: AtendimentoOrderByWithRelationInput | AtendimentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Atendimentos.
     */
    cursor?: AtendimentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Atendimentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Atendimentos.
     */
    skip?: number
    distinct?: AtendimentoScalarFieldEnum | AtendimentoScalarFieldEnum[]
  }

  /**
   * Atendimento create
   */
  export type AtendimentoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Atendimento
     */
    select?: AtendimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Atendimento
     */
    omit?: AtendimentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AtendimentoInclude<ExtArgs> | null
    /**
     * The data needed to create a Atendimento.
     */
    data: XOR<AtendimentoCreateInput, AtendimentoUncheckedCreateInput>
  }

  /**
   * Atendimento createMany
   */
  export type AtendimentoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Atendimentos.
     */
    data: AtendimentoCreateManyInput | AtendimentoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Atendimento createManyAndReturn
   */
  export type AtendimentoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Atendimento
     */
    select?: AtendimentoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Atendimento
     */
    omit?: AtendimentoOmit<ExtArgs> | null
    /**
     * The data used to create many Atendimentos.
     */
    data: AtendimentoCreateManyInput | AtendimentoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AtendimentoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Atendimento update
   */
  export type AtendimentoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Atendimento
     */
    select?: AtendimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Atendimento
     */
    omit?: AtendimentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AtendimentoInclude<ExtArgs> | null
    /**
     * The data needed to update a Atendimento.
     */
    data: XOR<AtendimentoUpdateInput, AtendimentoUncheckedUpdateInput>
    /**
     * Choose, which Atendimento to update.
     */
    where: AtendimentoWhereUniqueInput
  }

  /**
   * Atendimento updateMany
   */
  export type AtendimentoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Atendimentos.
     */
    data: XOR<AtendimentoUpdateManyMutationInput, AtendimentoUncheckedUpdateManyInput>
    /**
     * Filter which Atendimentos to update
     */
    where?: AtendimentoWhereInput
    /**
     * Limit how many Atendimentos to update.
     */
    limit?: number
  }

  /**
   * Atendimento updateManyAndReturn
   */
  export type AtendimentoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Atendimento
     */
    select?: AtendimentoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Atendimento
     */
    omit?: AtendimentoOmit<ExtArgs> | null
    /**
     * The data used to update Atendimentos.
     */
    data: XOR<AtendimentoUpdateManyMutationInput, AtendimentoUncheckedUpdateManyInput>
    /**
     * Filter which Atendimentos to update
     */
    where?: AtendimentoWhereInput
    /**
     * Limit how many Atendimentos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AtendimentoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Atendimento upsert
   */
  export type AtendimentoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Atendimento
     */
    select?: AtendimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Atendimento
     */
    omit?: AtendimentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AtendimentoInclude<ExtArgs> | null
    /**
     * The filter to search for the Atendimento to update in case it exists.
     */
    where: AtendimentoWhereUniqueInput
    /**
     * In case the Atendimento found by the `where` argument doesn't exist, create a new Atendimento with this data.
     */
    create: XOR<AtendimentoCreateInput, AtendimentoUncheckedCreateInput>
    /**
     * In case the Atendimento was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AtendimentoUpdateInput, AtendimentoUncheckedUpdateInput>
  }

  /**
   * Atendimento delete
   */
  export type AtendimentoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Atendimento
     */
    select?: AtendimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Atendimento
     */
    omit?: AtendimentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AtendimentoInclude<ExtArgs> | null
    /**
     * Filter which Atendimento to delete.
     */
    where: AtendimentoWhereUniqueInput
  }

  /**
   * Atendimento deleteMany
   */
  export type AtendimentoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Atendimentos to delete
     */
    where?: AtendimentoWhereInput
    /**
     * Limit how many Atendimentos to delete.
     */
    limit?: number
  }

  /**
   * Atendimento without action
   */
  export type AtendimentoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Atendimento
     */
    select?: AtendimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Atendimento
     */
    omit?: AtendimentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AtendimentoInclude<ExtArgs> | null
  }


  /**
   * Model WhatsAppConfig
   */

  export type AggregateWhatsAppConfig = {
    _count: WhatsAppConfigCountAggregateOutputType | null
    _avg: WhatsAppConfigAvgAggregateOutputType | null
    _sum: WhatsAppConfigSumAggregateOutputType | null
    _min: WhatsAppConfigMinAggregateOutputType | null
    _max: WhatsAppConfigMaxAggregateOutputType | null
  }

  export type WhatsAppConfigAvgAggregateOutputType = {
    horasAntecedencia: number | null
  }

  export type WhatsAppConfigSumAggregateOutputType = {
    horasAntecedencia: number | null
  }

  export type WhatsAppConfigMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    templateConfirmacao: string | null
    templateSim: string | null
    templateNao: string | null
    templateOpcoesInvalidas: string | null
    horasAntecedencia: number | null
    ativo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WhatsAppConfigMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    templateConfirmacao: string | null
    templateSim: string | null
    templateNao: string | null
    templateOpcoesInvalidas: string | null
    horasAntecedencia: number | null
    ativo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WhatsAppConfigCountAggregateOutputType = {
    id: number
    tenantId: number
    templateConfirmacao: number
    templateSim: number
    templateNao: number
    templateOpcoesInvalidas: number
    horasAntecedencia: number
    ativo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WhatsAppConfigAvgAggregateInputType = {
    horasAntecedencia?: true
  }

  export type WhatsAppConfigSumAggregateInputType = {
    horasAntecedencia?: true
  }

  export type WhatsAppConfigMinAggregateInputType = {
    id?: true
    tenantId?: true
    templateConfirmacao?: true
    templateSim?: true
    templateNao?: true
    templateOpcoesInvalidas?: true
    horasAntecedencia?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WhatsAppConfigMaxAggregateInputType = {
    id?: true
    tenantId?: true
    templateConfirmacao?: true
    templateSim?: true
    templateNao?: true
    templateOpcoesInvalidas?: true
    horasAntecedencia?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WhatsAppConfigCountAggregateInputType = {
    id?: true
    tenantId?: true
    templateConfirmacao?: true
    templateSim?: true
    templateNao?: true
    templateOpcoesInvalidas?: true
    horasAntecedencia?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WhatsAppConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WhatsAppConfig to aggregate.
     */
    where?: WhatsAppConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WhatsAppConfigs to fetch.
     */
    orderBy?: WhatsAppConfigOrderByWithRelationInput | WhatsAppConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WhatsAppConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WhatsAppConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WhatsAppConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WhatsAppConfigs
    **/
    _count?: true | WhatsAppConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WhatsAppConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WhatsAppConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WhatsAppConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WhatsAppConfigMaxAggregateInputType
  }

  export type GetWhatsAppConfigAggregateType<T extends WhatsAppConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateWhatsAppConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWhatsAppConfig[P]>
      : GetScalarType<T[P], AggregateWhatsAppConfig[P]>
  }




  export type WhatsAppConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WhatsAppConfigWhereInput
    orderBy?: WhatsAppConfigOrderByWithAggregationInput | WhatsAppConfigOrderByWithAggregationInput[]
    by: WhatsAppConfigScalarFieldEnum[] | WhatsAppConfigScalarFieldEnum
    having?: WhatsAppConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WhatsAppConfigCountAggregateInputType | true
    _avg?: WhatsAppConfigAvgAggregateInputType
    _sum?: WhatsAppConfigSumAggregateInputType
    _min?: WhatsAppConfigMinAggregateInputType
    _max?: WhatsAppConfigMaxAggregateInputType
  }

  export type WhatsAppConfigGroupByOutputType = {
    id: string
    tenantId: string
    templateConfirmacao: string
    templateSim: string
    templateNao: string
    templateOpcoesInvalidas: string
    horasAntecedencia: number
    ativo: boolean
    createdAt: Date
    updatedAt: Date
    _count: WhatsAppConfigCountAggregateOutputType | null
    _avg: WhatsAppConfigAvgAggregateOutputType | null
    _sum: WhatsAppConfigSumAggregateOutputType | null
    _min: WhatsAppConfigMinAggregateOutputType | null
    _max: WhatsAppConfigMaxAggregateOutputType | null
  }

  type GetWhatsAppConfigGroupByPayload<T extends WhatsAppConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WhatsAppConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WhatsAppConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WhatsAppConfigGroupByOutputType[P]>
            : GetScalarType<T[P], WhatsAppConfigGroupByOutputType[P]>
        }
      >
    >


  export type WhatsAppConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    templateConfirmacao?: boolean
    templateSim?: boolean
    templateNao?: boolean
    templateOpcoesInvalidas?: boolean
    horasAntecedencia?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["whatsAppConfig"]>

  export type WhatsAppConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    templateConfirmacao?: boolean
    templateSim?: boolean
    templateNao?: boolean
    templateOpcoesInvalidas?: boolean
    horasAntecedencia?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["whatsAppConfig"]>

  export type WhatsAppConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    templateConfirmacao?: boolean
    templateSim?: boolean
    templateNao?: boolean
    templateOpcoesInvalidas?: boolean
    horasAntecedencia?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["whatsAppConfig"]>

  export type WhatsAppConfigSelectScalar = {
    id?: boolean
    tenantId?: boolean
    templateConfirmacao?: boolean
    templateSim?: boolean
    templateNao?: boolean
    templateOpcoesInvalidas?: boolean
    horasAntecedencia?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WhatsAppConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "templateConfirmacao" | "templateSim" | "templateNao" | "templateOpcoesInvalidas" | "horasAntecedencia" | "ativo" | "createdAt" | "updatedAt", ExtArgs["result"]["whatsAppConfig"]>
  export type WhatsAppConfigInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type WhatsAppConfigIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type WhatsAppConfigIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $WhatsAppConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WhatsAppConfig"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      templateConfirmacao: string
      templateSim: string
      templateNao: string
      templateOpcoesInvalidas: string
      horasAntecedencia: number
      ativo: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["whatsAppConfig"]>
    composites: {}
  }

  type WhatsAppConfigGetPayload<S extends boolean | null | undefined | WhatsAppConfigDefaultArgs> = $Result.GetResult<Prisma.$WhatsAppConfigPayload, S>

  type WhatsAppConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WhatsAppConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WhatsAppConfigCountAggregateInputType | true
    }

  export interface WhatsAppConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WhatsAppConfig'], meta: { name: 'WhatsAppConfig' } }
    /**
     * Find zero or one WhatsAppConfig that matches the filter.
     * @param {WhatsAppConfigFindUniqueArgs} args - Arguments to find a WhatsAppConfig
     * @example
     * // Get one WhatsAppConfig
     * const whatsAppConfig = await prisma.whatsAppConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WhatsAppConfigFindUniqueArgs>(args: SelectSubset<T, WhatsAppConfigFindUniqueArgs<ExtArgs>>): Prisma__WhatsAppConfigClient<$Result.GetResult<Prisma.$WhatsAppConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WhatsAppConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WhatsAppConfigFindUniqueOrThrowArgs} args - Arguments to find a WhatsAppConfig
     * @example
     * // Get one WhatsAppConfig
     * const whatsAppConfig = await prisma.whatsAppConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WhatsAppConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, WhatsAppConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WhatsAppConfigClient<$Result.GetResult<Prisma.$WhatsAppConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WhatsAppConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhatsAppConfigFindFirstArgs} args - Arguments to find a WhatsAppConfig
     * @example
     * // Get one WhatsAppConfig
     * const whatsAppConfig = await prisma.whatsAppConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WhatsAppConfigFindFirstArgs>(args?: SelectSubset<T, WhatsAppConfigFindFirstArgs<ExtArgs>>): Prisma__WhatsAppConfigClient<$Result.GetResult<Prisma.$WhatsAppConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WhatsAppConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhatsAppConfigFindFirstOrThrowArgs} args - Arguments to find a WhatsAppConfig
     * @example
     * // Get one WhatsAppConfig
     * const whatsAppConfig = await prisma.whatsAppConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WhatsAppConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, WhatsAppConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__WhatsAppConfigClient<$Result.GetResult<Prisma.$WhatsAppConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WhatsAppConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhatsAppConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WhatsAppConfigs
     * const whatsAppConfigs = await prisma.whatsAppConfig.findMany()
     * 
     * // Get first 10 WhatsAppConfigs
     * const whatsAppConfigs = await prisma.whatsAppConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const whatsAppConfigWithIdOnly = await prisma.whatsAppConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WhatsAppConfigFindManyArgs>(args?: SelectSubset<T, WhatsAppConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WhatsAppConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WhatsAppConfig.
     * @param {WhatsAppConfigCreateArgs} args - Arguments to create a WhatsAppConfig.
     * @example
     * // Create one WhatsAppConfig
     * const WhatsAppConfig = await prisma.whatsAppConfig.create({
     *   data: {
     *     // ... data to create a WhatsAppConfig
     *   }
     * })
     * 
     */
    create<T extends WhatsAppConfigCreateArgs>(args: SelectSubset<T, WhatsAppConfigCreateArgs<ExtArgs>>): Prisma__WhatsAppConfigClient<$Result.GetResult<Prisma.$WhatsAppConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WhatsAppConfigs.
     * @param {WhatsAppConfigCreateManyArgs} args - Arguments to create many WhatsAppConfigs.
     * @example
     * // Create many WhatsAppConfigs
     * const whatsAppConfig = await prisma.whatsAppConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WhatsAppConfigCreateManyArgs>(args?: SelectSubset<T, WhatsAppConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WhatsAppConfigs and returns the data saved in the database.
     * @param {WhatsAppConfigCreateManyAndReturnArgs} args - Arguments to create many WhatsAppConfigs.
     * @example
     * // Create many WhatsAppConfigs
     * const whatsAppConfig = await prisma.whatsAppConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WhatsAppConfigs and only return the `id`
     * const whatsAppConfigWithIdOnly = await prisma.whatsAppConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WhatsAppConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, WhatsAppConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WhatsAppConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WhatsAppConfig.
     * @param {WhatsAppConfigDeleteArgs} args - Arguments to delete one WhatsAppConfig.
     * @example
     * // Delete one WhatsAppConfig
     * const WhatsAppConfig = await prisma.whatsAppConfig.delete({
     *   where: {
     *     // ... filter to delete one WhatsAppConfig
     *   }
     * })
     * 
     */
    delete<T extends WhatsAppConfigDeleteArgs>(args: SelectSubset<T, WhatsAppConfigDeleteArgs<ExtArgs>>): Prisma__WhatsAppConfigClient<$Result.GetResult<Prisma.$WhatsAppConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WhatsAppConfig.
     * @param {WhatsAppConfigUpdateArgs} args - Arguments to update one WhatsAppConfig.
     * @example
     * // Update one WhatsAppConfig
     * const whatsAppConfig = await prisma.whatsAppConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WhatsAppConfigUpdateArgs>(args: SelectSubset<T, WhatsAppConfigUpdateArgs<ExtArgs>>): Prisma__WhatsAppConfigClient<$Result.GetResult<Prisma.$WhatsAppConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WhatsAppConfigs.
     * @param {WhatsAppConfigDeleteManyArgs} args - Arguments to filter WhatsAppConfigs to delete.
     * @example
     * // Delete a few WhatsAppConfigs
     * const { count } = await prisma.whatsAppConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WhatsAppConfigDeleteManyArgs>(args?: SelectSubset<T, WhatsAppConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WhatsAppConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhatsAppConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WhatsAppConfigs
     * const whatsAppConfig = await prisma.whatsAppConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WhatsAppConfigUpdateManyArgs>(args: SelectSubset<T, WhatsAppConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WhatsAppConfigs and returns the data updated in the database.
     * @param {WhatsAppConfigUpdateManyAndReturnArgs} args - Arguments to update many WhatsAppConfigs.
     * @example
     * // Update many WhatsAppConfigs
     * const whatsAppConfig = await prisma.whatsAppConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WhatsAppConfigs and only return the `id`
     * const whatsAppConfigWithIdOnly = await prisma.whatsAppConfig.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends WhatsAppConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, WhatsAppConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WhatsAppConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WhatsAppConfig.
     * @param {WhatsAppConfigUpsertArgs} args - Arguments to update or create a WhatsAppConfig.
     * @example
     * // Update or create a WhatsAppConfig
     * const whatsAppConfig = await prisma.whatsAppConfig.upsert({
     *   create: {
     *     // ... data to create a WhatsAppConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WhatsAppConfig we want to update
     *   }
     * })
     */
    upsert<T extends WhatsAppConfigUpsertArgs>(args: SelectSubset<T, WhatsAppConfigUpsertArgs<ExtArgs>>): Prisma__WhatsAppConfigClient<$Result.GetResult<Prisma.$WhatsAppConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WhatsAppConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhatsAppConfigCountArgs} args - Arguments to filter WhatsAppConfigs to count.
     * @example
     * // Count the number of WhatsAppConfigs
     * const count = await prisma.whatsAppConfig.count({
     *   where: {
     *     // ... the filter for the WhatsAppConfigs we want to count
     *   }
     * })
    **/
    count<T extends WhatsAppConfigCountArgs>(
      args?: Subset<T, WhatsAppConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WhatsAppConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WhatsAppConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhatsAppConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WhatsAppConfigAggregateArgs>(args: Subset<T, WhatsAppConfigAggregateArgs>): Prisma.PrismaPromise<GetWhatsAppConfigAggregateType<T>>

    /**
     * Group by WhatsAppConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhatsAppConfigGroupByArgs} args - Group by arguments.
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
      T extends WhatsAppConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WhatsAppConfigGroupByArgs['orderBy'] }
        : { orderBy?: WhatsAppConfigGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WhatsAppConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWhatsAppConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WhatsAppConfig model
   */
  readonly fields: WhatsAppConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WhatsAppConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WhatsAppConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the WhatsAppConfig model
   */
  interface WhatsAppConfigFieldRefs {
    readonly id: FieldRef<"WhatsAppConfig", 'String'>
    readonly tenantId: FieldRef<"WhatsAppConfig", 'String'>
    readonly templateConfirmacao: FieldRef<"WhatsAppConfig", 'String'>
    readonly templateSim: FieldRef<"WhatsAppConfig", 'String'>
    readonly templateNao: FieldRef<"WhatsAppConfig", 'String'>
    readonly templateOpcoesInvalidas: FieldRef<"WhatsAppConfig", 'String'>
    readonly horasAntecedencia: FieldRef<"WhatsAppConfig", 'Int'>
    readonly ativo: FieldRef<"WhatsAppConfig", 'Boolean'>
    readonly createdAt: FieldRef<"WhatsAppConfig", 'DateTime'>
    readonly updatedAt: FieldRef<"WhatsAppConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WhatsAppConfig findUnique
   */
  export type WhatsAppConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsAppConfig
     */
    select?: WhatsAppConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WhatsAppConfig
     */
    omit?: WhatsAppConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WhatsAppConfigInclude<ExtArgs> | null
    /**
     * Filter, which WhatsAppConfig to fetch.
     */
    where: WhatsAppConfigWhereUniqueInput
  }

  /**
   * WhatsAppConfig findUniqueOrThrow
   */
  export type WhatsAppConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsAppConfig
     */
    select?: WhatsAppConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WhatsAppConfig
     */
    omit?: WhatsAppConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WhatsAppConfigInclude<ExtArgs> | null
    /**
     * Filter, which WhatsAppConfig to fetch.
     */
    where: WhatsAppConfigWhereUniqueInput
  }

  /**
   * WhatsAppConfig findFirst
   */
  export type WhatsAppConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsAppConfig
     */
    select?: WhatsAppConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WhatsAppConfig
     */
    omit?: WhatsAppConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WhatsAppConfigInclude<ExtArgs> | null
    /**
     * Filter, which WhatsAppConfig to fetch.
     */
    where?: WhatsAppConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WhatsAppConfigs to fetch.
     */
    orderBy?: WhatsAppConfigOrderByWithRelationInput | WhatsAppConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WhatsAppConfigs.
     */
    cursor?: WhatsAppConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WhatsAppConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WhatsAppConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WhatsAppConfigs.
     */
    distinct?: WhatsAppConfigScalarFieldEnum | WhatsAppConfigScalarFieldEnum[]
  }

  /**
   * WhatsAppConfig findFirstOrThrow
   */
  export type WhatsAppConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsAppConfig
     */
    select?: WhatsAppConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WhatsAppConfig
     */
    omit?: WhatsAppConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WhatsAppConfigInclude<ExtArgs> | null
    /**
     * Filter, which WhatsAppConfig to fetch.
     */
    where?: WhatsAppConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WhatsAppConfigs to fetch.
     */
    orderBy?: WhatsAppConfigOrderByWithRelationInput | WhatsAppConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WhatsAppConfigs.
     */
    cursor?: WhatsAppConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WhatsAppConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WhatsAppConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WhatsAppConfigs.
     */
    distinct?: WhatsAppConfigScalarFieldEnum | WhatsAppConfigScalarFieldEnum[]
  }

  /**
   * WhatsAppConfig findMany
   */
  export type WhatsAppConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsAppConfig
     */
    select?: WhatsAppConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WhatsAppConfig
     */
    omit?: WhatsAppConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WhatsAppConfigInclude<ExtArgs> | null
    /**
     * Filter, which WhatsAppConfigs to fetch.
     */
    where?: WhatsAppConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WhatsAppConfigs to fetch.
     */
    orderBy?: WhatsAppConfigOrderByWithRelationInput | WhatsAppConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WhatsAppConfigs.
     */
    cursor?: WhatsAppConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WhatsAppConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WhatsAppConfigs.
     */
    skip?: number
    distinct?: WhatsAppConfigScalarFieldEnum | WhatsAppConfigScalarFieldEnum[]
  }

  /**
   * WhatsAppConfig create
   */
  export type WhatsAppConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsAppConfig
     */
    select?: WhatsAppConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WhatsAppConfig
     */
    omit?: WhatsAppConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WhatsAppConfigInclude<ExtArgs> | null
    /**
     * The data needed to create a WhatsAppConfig.
     */
    data: XOR<WhatsAppConfigCreateInput, WhatsAppConfigUncheckedCreateInput>
  }

  /**
   * WhatsAppConfig createMany
   */
  export type WhatsAppConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WhatsAppConfigs.
     */
    data: WhatsAppConfigCreateManyInput | WhatsAppConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WhatsAppConfig createManyAndReturn
   */
  export type WhatsAppConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsAppConfig
     */
    select?: WhatsAppConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WhatsAppConfig
     */
    omit?: WhatsAppConfigOmit<ExtArgs> | null
    /**
     * The data used to create many WhatsAppConfigs.
     */
    data: WhatsAppConfigCreateManyInput | WhatsAppConfigCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WhatsAppConfigIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WhatsAppConfig update
   */
  export type WhatsAppConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsAppConfig
     */
    select?: WhatsAppConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WhatsAppConfig
     */
    omit?: WhatsAppConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WhatsAppConfigInclude<ExtArgs> | null
    /**
     * The data needed to update a WhatsAppConfig.
     */
    data: XOR<WhatsAppConfigUpdateInput, WhatsAppConfigUncheckedUpdateInput>
    /**
     * Choose, which WhatsAppConfig to update.
     */
    where: WhatsAppConfigWhereUniqueInput
  }

  /**
   * WhatsAppConfig updateMany
   */
  export type WhatsAppConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WhatsAppConfigs.
     */
    data: XOR<WhatsAppConfigUpdateManyMutationInput, WhatsAppConfigUncheckedUpdateManyInput>
    /**
     * Filter which WhatsAppConfigs to update
     */
    where?: WhatsAppConfigWhereInput
    /**
     * Limit how many WhatsAppConfigs to update.
     */
    limit?: number
  }

  /**
   * WhatsAppConfig updateManyAndReturn
   */
  export type WhatsAppConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsAppConfig
     */
    select?: WhatsAppConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WhatsAppConfig
     */
    omit?: WhatsAppConfigOmit<ExtArgs> | null
    /**
     * The data used to update WhatsAppConfigs.
     */
    data: XOR<WhatsAppConfigUpdateManyMutationInput, WhatsAppConfigUncheckedUpdateManyInput>
    /**
     * Filter which WhatsAppConfigs to update
     */
    where?: WhatsAppConfigWhereInput
    /**
     * Limit how many WhatsAppConfigs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WhatsAppConfigIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WhatsAppConfig upsert
   */
  export type WhatsAppConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsAppConfig
     */
    select?: WhatsAppConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WhatsAppConfig
     */
    omit?: WhatsAppConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WhatsAppConfigInclude<ExtArgs> | null
    /**
     * The filter to search for the WhatsAppConfig to update in case it exists.
     */
    where: WhatsAppConfigWhereUniqueInput
    /**
     * In case the WhatsAppConfig found by the `where` argument doesn't exist, create a new WhatsAppConfig with this data.
     */
    create: XOR<WhatsAppConfigCreateInput, WhatsAppConfigUncheckedCreateInput>
    /**
     * In case the WhatsAppConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WhatsAppConfigUpdateInput, WhatsAppConfigUncheckedUpdateInput>
  }

  /**
   * WhatsAppConfig delete
   */
  export type WhatsAppConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsAppConfig
     */
    select?: WhatsAppConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WhatsAppConfig
     */
    omit?: WhatsAppConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WhatsAppConfigInclude<ExtArgs> | null
    /**
     * Filter which WhatsAppConfig to delete.
     */
    where: WhatsAppConfigWhereUniqueInput
  }

  /**
   * WhatsAppConfig deleteMany
   */
  export type WhatsAppConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WhatsAppConfigs to delete
     */
    where?: WhatsAppConfigWhereInput
    /**
     * Limit how many WhatsAppConfigs to delete.
     */
    limit?: number
  }

  /**
   * WhatsAppConfig without action
   */
  export type WhatsAppConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsAppConfig
     */
    select?: WhatsAppConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WhatsAppConfig
     */
    omit?: WhatsAppConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WhatsAppConfigInclude<ExtArgs> | null
  }


  /**
   * Model LogSistema
   */

  export type AggregateLogSistema = {
    _count: LogSistemaCountAggregateOutputType | null
    _min: LogSistemaMinAggregateOutputType | null
    _max: LogSistemaMaxAggregateOutputType | null
  }

  export type LogSistemaMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    usuarioId: string | null
    tipo: $Enums.TipoLog | null
    descricao: string | null
    createdAt: Date | null
  }

  export type LogSistemaMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    usuarioId: string | null
    tipo: $Enums.TipoLog | null
    descricao: string | null
    createdAt: Date | null
  }

  export type LogSistemaCountAggregateOutputType = {
    id: number
    tenantId: number
    usuarioId: number
    tipo: number
    descricao: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type LogSistemaMinAggregateInputType = {
    id?: true
    tenantId?: true
    usuarioId?: true
    tipo?: true
    descricao?: true
    createdAt?: true
  }

  export type LogSistemaMaxAggregateInputType = {
    id?: true
    tenantId?: true
    usuarioId?: true
    tipo?: true
    descricao?: true
    createdAt?: true
  }

  export type LogSistemaCountAggregateInputType = {
    id?: true
    tenantId?: true
    usuarioId?: true
    tipo?: true
    descricao?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type LogSistemaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LogSistema to aggregate.
     */
    where?: LogSistemaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LogSistemas to fetch.
     */
    orderBy?: LogSistemaOrderByWithRelationInput | LogSistemaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LogSistemaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LogSistemas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LogSistemas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LogSistemas
    **/
    _count?: true | LogSistemaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LogSistemaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LogSistemaMaxAggregateInputType
  }

  export type GetLogSistemaAggregateType<T extends LogSistemaAggregateArgs> = {
        [P in keyof T & keyof AggregateLogSistema]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLogSistema[P]>
      : GetScalarType<T[P], AggregateLogSistema[P]>
  }




  export type LogSistemaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LogSistemaWhereInput
    orderBy?: LogSistemaOrderByWithAggregationInput | LogSistemaOrderByWithAggregationInput[]
    by: LogSistemaScalarFieldEnum[] | LogSistemaScalarFieldEnum
    having?: LogSistemaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LogSistemaCountAggregateInputType | true
    _min?: LogSistemaMinAggregateInputType
    _max?: LogSistemaMaxAggregateInputType
  }

  export type LogSistemaGroupByOutputType = {
    id: string
    tenantId: string
    usuarioId: string | null
    tipo: $Enums.TipoLog
    descricao: string
    metadata: JsonValue | null
    createdAt: Date
    _count: LogSistemaCountAggregateOutputType | null
    _min: LogSistemaMinAggregateOutputType | null
    _max: LogSistemaMaxAggregateOutputType | null
  }

  type GetLogSistemaGroupByPayload<T extends LogSistemaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LogSistemaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LogSistemaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LogSistemaGroupByOutputType[P]>
            : GetScalarType<T[P], LogSistemaGroupByOutputType[P]>
        }
      >
    >


  export type LogSistemaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    usuarioId?: boolean
    tipo?: boolean
    descricao?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["logSistema"]>

  export type LogSistemaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    usuarioId?: boolean
    tipo?: boolean
    descricao?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["logSistema"]>

  export type LogSistemaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    usuarioId?: boolean
    tipo?: boolean
    descricao?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["logSistema"]>

  export type LogSistemaSelectScalar = {
    id?: boolean
    tenantId?: boolean
    usuarioId?: boolean
    tipo?: boolean
    descricao?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type LogSistemaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "usuarioId" | "tipo" | "descricao" | "metadata" | "createdAt", ExtArgs["result"]["logSistema"]>

  export type $LogSistemaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LogSistema"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      usuarioId: string | null
      tipo: $Enums.TipoLog
      descricao: string
      metadata: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["logSistema"]>
    composites: {}
  }

  type LogSistemaGetPayload<S extends boolean | null | undefined | LogSistemaDefaultArgs> = $Result.GetResult<Prisma.$LogSistemaPayload, S>

  type LogSistemaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LogSistemaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LogSistemaCountAggregateInputType | true
    }

  export interface LogSistemaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LogSistema'], meta: { name: 'LogSistema' } }
    /**
     * Find zero or one LogSistema that matches the filter.
     * @param {LogSistemaFindUniqueArgs} args - Arguments to find a LogSistema
     * @example
     * // Get one LogSistema
     * const logSistema = await prisma.logSistema.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LogSistemaFindUniqueArgs>(args: SelectSubset<T, LogSistemaFindUniqueArgs<ExtArgs>>): Prisma__LogSistemaClient<$Result.GetResult<Prisma.$LogSistemaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LogSistema that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LogSistemaFindUniqueOrThrowArgs} args - Arguments to find a LogSistema
     * @example
     * // Get one LogSistema
     * const logSistema = await prisma.logSistema.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LogSistemaFindUniqueOrThrowArgs>(args: SelectSubset<T, LogSistemaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LogSistemaClient<$Result.GetResult<Prisma.$LogSistemaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LogSistema that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogSistemaFindFirstArgs} args - Arguments to find a LogSistema
     * @example
     * // Get one LogSistema
     * const logSistema = await prisma.logSistema.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LogSistemaFindFirstArgs>(args?: SelectSubset<T, LogSistemaFindFirstArgs<ExtArgs>>): Prisma__LogSistemaClient<$Result.GetResult<Prisma.$LogSistemaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LogSistema that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogSistemaFindFirstOrThrowArgs} args - Arguments to find a LogSistema
     * @example
     * // Get one LogSistema
     * const logSistema = await prisma.logSistema.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LogSistemaFindFirstOrThrowArgs>(args?: SelectSubset<T, LogSistemaFindFirstOrThrowArgs<ExtArgs>>): Prisma__LogSistemaClient<$Result.GetResult<Prisma.$LogSistemaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LogSistemas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogSistemaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LogSistemas
     * const logSistemas = await prisma.logSistema.findMany()
     * 
     * // Get first 10 LogSistemas
     * const logSistemas = await prisma.logSistema.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const logSistemaWithIdOnly = await prisma.logSistema.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LogSistemaFindManyArgs>(args?: SelectSubset<T, LogSistemaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LogSistemaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LogSistema.
     * @param {LogSistemaCreateArgs} args - Arguments to create a LogSistema.
     * @example
     * // Create one LogSistema
     * const LogSistema = await prisma.logSistema.create({
     *   data: {
     *     // ... data to create a LogSistema
     *   }
     * })
     * 
     */
    create<T extends LogSistemaCreateArgs>(args: SelectSubset<T, LogSistemaCreateArgs<ExtArgs>>): Prisma__LogSistemaClient<$Result.GetResult<Prisma.$LogSistemaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LogSistemas.
     * @param {LogSistemaCreateManyArgs} args - Arguments to create many LogSistemas.
     * @example
     * // Create many LogSistemas
     * const logSistema = await prisma.logSistema.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LogSistemaCreateManyArgs>(args?: SelectSubset<T, LogSistemaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LogSistemas and returns the data saved in the database.
     * @param {LogSistemaCreateManyAndReturnArgs} args - Arguments to create many LogSistemas.
     * @example
     * // Create many LogSistemas
     * const logSistema = await prisma.logSistema.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LogSistemas and only return the `id`
     * const logSistemaWithIdOnly = await prisma.logSistema.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LogSistemaCreateManyAndReturnArgs>(args?: SelectSubset<T, LogSistemaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LogSistemaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LogSistema.
     * @param {LogSistemaDeleteArgs} args - Arguments to delete one LogSistema.
     * @example
     * // Delete one LogSistema
     * const LogSistema = await prisma.logSistema.delete({
     *   where: {
     *     // ... filter to delete one LogSistema
     *   }
     * })
     * 
     */
    delete<T extends LogSistemaDeleteArgs>(args: SelectSubset<T, LogSistemaDeleteArgs<ExtArgs>>): Prisma__LogSistemaClient<$Result.GetResult<Prisma.$LogSistemaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LogSistema.
     * @param {LogSistemaUpdateArgs} args - Arguments to update one LogSistema.
     * @example
     * // Update one LogSistema
     * const logSistema = await prisma.logSistema.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LogSistemaUpdateArgs>(args: SelectSubset<T, LogSistemaUpdateArgs<ExtArgs>>): Prisma__LogSistemaClient<$Result.GetResult<Prisma.$LogSistemaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LogSistemas.
     * @param {LogSistemaDeleteManyArgs} args - Arguments to filter LogSistemas to delete.
     * @example
     * // Delete a few LogSistemas
     * const { count } = await prisma.logSistema.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LogSistemaDeleteManyArgs>(args?: SelectSubset<T, LogSistemaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LogSistemas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogSistemaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LogSistemas
     * const logSistema = await prisma.logSistema.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LogSistemaUpdateManyArgs>(args: SelectSubset<T, LogSistemaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LogSistemas and returns the data updated in the database.
     * @param {LogSistemaUpdateManyAndReturnArgs} args - Arguments to update many LogSistemas.
     * @example
     * // Update many LogSistemas
     * const logSistema = await prisma.logSistema.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LogSistemas and only return the `id`
     * const logSistemaWithIdOnly = await prisma.logSistema.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends LogSistemaUpdateManyAndReturnArgs>(args: SelectSubset<T, LogSistemaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LogSistemaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LogSistema.
     * @param {LogSistemaUpsertArgs} args - Arguments to update or create a LogSistema.
     * @example
     * // Update or create a LogSistema
     * const logSistema = await prisma.logSistema.upsert({
     *   create: {
     *     // ... data to create a LogSistema
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LogSistema we want to update
     *   }
     * })
     */
    upsert<T extends LogSistemaUpsertArgs>(args: SelectSubset<T, LogSistemaUpsertArgs<ExtArgs>>): Prisma__LogSistemaClient<$Result.GetResult<Prisma.$LogSistemaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LogSistemas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogSistemaCountArgs} args - Arguments to filter LogSistemas to count.
     * @example
     * // Count the number of LogSistemas
     * const count = await prisma.logSistema.count({
     *   where: {
     *     // ... the filter for the LogSistemas we want to count
     *   }
     * })
    **/
    count<T extends LogSistemaCountArgs>(
      args?: Subset<T, LogSistemaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LogSistemaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LogSistema.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogSistemaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LogSistemaAggregateArgs>(args: Subset<T, LogSistemaAggregateArgs>): Prisma.PrismaPromise<GetLogSistemaAggregateType<T>>

    /**
     * Group by LogSistema.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogSistemaGroupByArgs} args - Group by arguments.
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
      T extends LogSistemaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LogSistemaGroupByArgs['orderBy'] }
        : { orderBy?: LogSistemaGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LogSistemaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLogSistemaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LogSistema model
   */
  readonly fields: LogSistemaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LogSistema.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LogSistemaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the LogSistema model
   */
  interface LogSistemaFieldRefs {
    readonly id: FieldRef<"LogSistema", 'String'>
    readonly tenantId: FieldRef<"LogSistema", 'String'>
    readonly usuarioId: FieldRef<"LogSistema", 'String'>
    readonly tipo: FieldRef<"LogSistema", 'TipoLog'>
    readonly descricao: FieldRef<"LogSistema", 'String'>
    readonly metadata: FieldRef<"LogSistema", 'Json'>
    readonly createdAt: FieldRef<"LogSistema", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LogSistema findUnique
   */
  export type LogSistemaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogSistema
     */
    select?: LogSistemaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogSistema
     */
    omit?: LogSistemaOmit<ExtArgs> | null
    /**
     * Filter, which LogSistema to fetch.
     */
    where: LogSistemaWhereUniqueInput
  }

  /**
   * LogSistema findUniqueOrThrow
   */
  export type LogSistemaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogSistema
     */
    select?: LogSistemaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogSistema
     */
    omit?: LogSistemaOmit<ExtArgs> | null
    /**
     * Filter, which LogSistema to fetch.
     */
    where: LogSistemaWhereUniqueInput
  }

  /**
   * LogSistema findFirst
   */
  export type LogSistemaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogSistema
     */
    select?: LogSistemaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogSistema
     */
    omit?: LogSistemaOmit<ExtArgs> | null
    /**
     * Filter, which LogSistema to fetch.
     */
    where?: LogSistemaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LogSistemas to fetch.
     */
    orderBy?: LogSistemaOrderByWithRelationInput | LogSistemaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LogSistemas.
     */
    cursor?: LogSistemaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LogSistemas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LogSistemas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LogSistemas.
     */
    distinct?: LogSistemaScalarFieldEnum | LogSistemaScalarFieldEnum[]
  }

  /**
   * LogSistema findFirstOrThrow
   */
  export type LogSistemaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogSistema
     */
    select?: LogSistemaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogSistema
     */
    omit?: LogSistemaOmit<ExtArgs> | null
    /**
     * Filter, which LogSistema to fetch.
     */
    where?: LogSistemaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LogSistemas to fetch.
     */
    orderBy?: LogSistemaOrderByWithRelationInput | LogSistemaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LogSistemas.
     */
    cursor?: LogSistemaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LogSistemas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LogSistemas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LogSistemas.
     */
    distinct?: LogSistemaScalarFieldEnum | LogSistemaScalarFieldEnum[]
  }

  /**
   * LogSistema findMany
   */
  export type LogSistemaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogSistema
     */
    select?: LogSistemaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogSistema
     */
    omit?: LogSistemaOmit<ExtArgs> | null
    /**
     * Filter, which LogSistemas to fetch.
     */
    where?: LogSistemaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LogSistemas to fetch.
     */
    orderBy?: LogSistemaOrderByWithRelationInput | LogSistemaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LogSistemas.
     */
    cursor?: LogSistemaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LogSistemas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LogSistemas.
     */
    skip?: number
    distinct?: LogSistemaScalarFieldEnum | LogSistemaScalarFieldEnum[]
  }

  /**
   * LogSistema create
   */
  export type LogSistemaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogSistema
     */
    select?: LogSistemaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogSistema
     */
    omit?: LogSistemaOmit<ExtArgs> | null
    /**
     * The data needed to create a LogSistema.
     */
    data: XOR<LogSistemaCreateInput, LogSistemaUncheckedCreateInput>
  }

  /**
   * LogSistema createMany
   */
  export type LogSistemaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LogSistemas.
     */
    data: LogSistemaCreateManyInput | LogSistemaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LogSistema createManyAndReturn
   */
  export type LogSistemaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogSistema
     */
    select?: LogSistemaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LogSistema
     */
    omit?: LogSistemaOmit<ExtArgs> | null
    /**
     * The data used to create many LogSistemas.
     */
    data: LogSistemaCreateManyInput | LogSistemaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LogSistema update
   */
  export type LogSistemaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogSistema
     */
    select?: LogSistemaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogSistema
     */
    omit?: LogSistemaOmit<ExtArgs> | null
    /**
     * The data needed to update a LogSistema.
     */
    data: XOR<LogSistemaUpdateInput, LogSistemaUncheckedUpdateInput>
    /**
     * Choose, which LogSistema to update.
     */
    where: LogSistemaWhereUniqueInput
  }

  /**
   * LogSistema updateMany
   */
  export type LogSistemaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LogSistemas.
     */
    data: XOR<LogSistemaUpdateManyMutationInput, LogSistemaUncheckedUpdateManyInput>
    /**
     * Filter which LogSistemas to update
     */
    where?: LogSistemaWhereInput
    /**
     * Limit how many LogSistemas to update.
     */
    limit?: number
  }

  /**
   * LogSistema updateManyAndReturn
   */
  export type LogSistemaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogSistema
     */
    select?: LogSistemaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LogSistema
     */
    omit?: LogSistemaOmit<ExtArgs> | null
    /**
     * The data used to update LogSistemas.
     */
    data: XOR<LogSistemaUpdateManyMutationInput, LogSistemaUncheckedUpdateManyInput>
    /**
     * Filter which LogSistemas to update
     */
    where?: LogSistemaWhereInput
    /**
     * Limit how many LogSistemas to update.
     */
    limit?: number
  }

  /**
   * LogSistema upsert
   */
  export type LogSistemaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogSistema
     */
    select?: LogSistemaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogSistema
     */
    omit?: LogSistemaOmit<ExtArgs> | null
    /**
     * The filter to search for the LogSistema to update in case it exists.
     */
    where: LogSistemaWhereUniqueInput
    /**
     * In case the LogSistema found by the `where` argument doesn't exist, create a new LogSistema with this data.
     */
    create: XOR<LogSistemaCreateInput, LogSistemaUncheckedCreateInput>
    /**
     * In case the LogSistema was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LogSistemaUpdateInput, LogSistemaUncheckedUpdateInput>
  }

  /**
   * LogSistema delete
   */
  export type LogSistemaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogSistema
     */
    select?: LogSistemaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogSistema
     */
    omit?: LogSistemaOmit<ExtArgs> | null
    /**
     * Filter which LogSistema to delete.
     */
    where: LogSistemaWhereUniqueInput
  }

  /**
   * LogSistema deleteMany
   */
  export type LogSistemaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LogSistemas to delete
     */
    where?: LogSistemaWhereInput
    /**
     * Limit how many LogSistemas to delete.
     */
    limit?: number
  }

  /**
   * LogSistema without action
   */
  export type LogSistemaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogSistema
     */
    select?: LogSistemaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogSistema
     */
    omit?: LogSistemaOmit<ExtArgs> | null
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


  export const TenantScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    plano: 'plano',
    ativo: 'ativo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TenantScalarFieldEnum = (typeof TenantScalarFieldEnum)[keyof typeof TenantScalarFieldEnum]


  export const UsuarioScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    nome: 'nome',
    email: 'email',
    senha: 'senha',
    tipo: 'tipo',
    ativo: 'ativo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum]


  export const ProfissionalScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    nome: 'nome',
    especialidade: 'especialidade',
    observacoes: 'observacoes',
    ativo: 'ativo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProfissionalScalarFieldEnum = (typeof ProfissionalScalarFieldEnum)[keyof typeof ProfissionalScalarFieldEnum]


  export const PacienteScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    profissionalId: 'profissionalId',
    nome: 'nome',
    telefone: 'telefone',
    email: 'email',
    observacoes: 'observacoes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PacienteScalarFieldEnum = (typeof PacienteScalarFieldEnum)[keyof typeof PacienteScalarFieldEnum]


  export const ProcedimentoScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    nome: 'nome',
    valor: 'valor',
    duracaoMinutos: 'duracaoMinutos',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProcedimentoScalarFieldEnum = (typeof ProcedimentoScalarFieldEnum)[keyof typeof ProcedimentoScalarFieldEnum]


  export const AgendamentoScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    pacienteId: 'pacienteId',
    profissionalId: 'profissionalId',
    procedimentoId: 'procedimentoId',
    dataHora: 'dataHora',
    status: 'status',
    observacoes: 'observacoes',
    confirmacaoEnviada: 'confirmacaoEnviada',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    dataHoraFim: 'dataHoraFim'
  };

  export type AgendamentoScalarFieldEnum = (typeof AgendamentoScalarFieldEnum)[keyof typeof AgendamentoScalarFieldEnum]


  export const AtendimentoScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    agendamentoId: 'agendamentoId',
    pacienteId: 'pacienteId',
    profissionalId: 'profissionalId',
    procedimentoId: 'procedimentoId',
    anotacoes: 'anotacoes',
    procedimentosRealizados: 'procedimentosRealizados',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AtendimentoScalarFieldEnum = (typeof AtendimentoScalarFieldEnum)[keyof typeof AtendimentoScalarFieldEnum]


  export const WhatsAppConfigScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    templateConfirmacao: 'templateConfirmacao',
    templateSim: 'templateSim',
    templateNao: 'templateNao',
    templateOpcoesInvalidas: 'templateOpcoesInvalidas',
    horasAntecedencia: 'horasAntecedencia',
    ativo: 'ativo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WhatsAppConfigScalarFieldEnum = (typeof WhatsAppConfigScalarFieldEnum)[keyof typeof WhatsAppConfigScalarFieldEnum]


  export const LogSistemaScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    usuarioId: 'usuarioId',
    tipo: 'tipo',
    descricao: 'descricao',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type LogSistemaScalarFieldEnum = (typeof LogSistemaScalarFieldEnum)[keyof typeof LogSistemaScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'TipoUsuario'
   */
  export type EnumTipoUsuarioFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoUsuario'>
    


  /**
   * Reference to a field of type 'TipoUsuario[]'
   */
  export type ListEnumTipoUsuarioFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoUsuario[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'StatusAgendamento'
   */
  export type EnumStatusAgendamentoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusAgendamento'>
    


  /**
   * Reference to a field of type 'StatusAgendamento[]'
   */
  export type ListEnumStatusAgendamentoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusAgendamento[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'TipoLog'
   */
  export type EnumTipoLogFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoLog'>
    


  /**
   * Reference to a field of type 'TipoLog[]'
   */
  export type ListEnumTipoLogFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoLog[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type TenantWhereInput = {
    AND?: TenantWhereInput | TenantWhereInput[]
    OR?: TenantWhereInput[]
    NOT?: TenantWhereInput | TenantWhereInput[]
    id?: StringFilter<"Tenant"> | string
    nome?: StringFilter<"Tenant"> | string
    plano?: StringFilter<"Tenant"> | string
    ativo?: BoolFilter<"Tenant"> | boolean
    createdAt?: DateTimeFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeFilter<"Tenant"> | Date | string
    agendamentos?: AgendamentoListRelationFilter
    atendimentos?: AtendimentoListRelationFilter
    pacientes?: PacienteListRelationFilter
    procedimentos?: ProcedimentoListRelationFilter
    profissionais?: ProfissionalListRelationFilter
    usuarios?: UsuarioListRelationFilter
    whatsappConfig?: XOR<WhatsAppConfigNullableScalarRelationFilter, WhatsAppConfigWhereInput> | null
  }

  export type TenantOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    plano?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    agendamentos?: AgendamentoOrderByRelationAggregateInput
    atendimentos?: AtendimentoOrderByRelationAggregateInput
    pacientes?: PacienteOrderByRelationAggregateInput
    procedimentos?: ProcedimentoOrderByRelationAggregateInput
    profissionais?: ProfissionalOrderByRelationAggregateInput
    usuarios?: UsuarioOrderByRelationAggregateInput
    whatsappConfig?: WhatsAppConfigOrderByWithRelationInput
  }

  export type TenantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TenantWhereInput | TenantWhereInput[]
    OR?: TenantWhereInput[]
    NOT?: TenantWhereInput | TenantWhereInput[]
    nome?: StringFilter<"Tenant"> | string
    plano?: StringFilter<"Tenant"> | string
    ativo?: BoolFilter<"Tenant"> | boolean
    createdAt?: DateTimeFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeFilter<"Tenant"> | Date | string
    agendamentos?: AgendamentoListRelationFilter
    atendimentos?: AtendimentoListRelationFilter
    pacientes?: PacienteListRelationFilter
    procedimentos?: ProcedimentoListRelationFilter
    profissionais?: ProfissionalListRelationFilter
    usuarios?: UsuarioListRelationFilter
    whatsappConfig?: XOR<WhatsAppConfigNullableScalarRelationFilter, WhatsAppConfigWhereInput> | null
  }, "id">

  export type TenantOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    plano?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TenantCountOrderByAggregateInput
    _max?: TenantMaxOrderByAggregateInput
    _min?: TenantMinOrderByAggregateInput
  }

  export type TenantScalarWhereWithAggregatesInput = {
    AND?: TenantScalarWhereWithAggregatesInput | TenantScalarWhereWithAggregatesInput[]
    OR?: TenantScalarWhereWithAggregatesInput[]
    NOT?: TenantScalarWhereWithAggregatesInput | TenantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tenant"> | string
    nome?: StringWithAggregatesFilter<"Tenant"> | string
    plano?: StringWithAggregatesFilter<"Tenant"> | string
    ativo?: BoolWithAggregatesFilter<"Tenant"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Tenant"> | Date | string
  }

  export type UsuarioWhereInput = {
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    id?: StringFilter<"Usuario"> | string
    tenantId?: StringFilter<"Usuario"> | string
    nome?: StringFilter<"Usuario"> | string
    email?: StringFilter<"Usuario"> | string
    senha?: StringFilter<"Usuario"> | string
    tipo?: EnumTipoUsuarioFilter<"Usuario"> | $Enums.TipoUsuario
    ativo?: BoolFilter<"Usuario"> | boolean
    createdAt?: DateTimeFilter<"Usuario"> | Date | string
    updatedAt?: DateTimeFilter<"Usuario"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
  }

  export type UsuarioOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    tipo?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
  }

  export type UsuarioWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_email?: UsuarioTenantIdEmailCompoundUniqueInput
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    tenantId?: StringFilter<"Usuario"> | string
    nome?: StringFilter<"Usuario"> | string
    email?: StringFilter<"Usuario"> | string
    senha?: StringFilter<"Usuario"> | string
    tipo?: EnumTipoUsuarioFilter<"Usuario"> | $Enums.TipoUsuario
    ativo?: BoolFilter<"Usuario"> | boolean
    createdAt?: DateTimeFilter<"Usuario"> | Date | string
    updatedAt?: DateTimeFilter<"Usuario"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
  }, "id" | "tenantId_email">

  export type UsuarioOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    tipo?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UsuarioCountOrderByAggregateInput
    _max?: UsuarioMaxOrderByAggregateInput
    _min?: UsuarioMinOrderByAggregateInput
  }

  export type UsuarioScalarWhereWithAggregatesInput = {
    AND?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    OR?: UsuarioScalarWhereWithAggregatesInput[]
    NOT?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Usuario"> | string
    tenantId?: StringWithAggregatesFilter<"Usuario"> | string
    nome?: StringWithAggregatesFilter<"Usuario"> | string
    email?: StringWithAggregatesFilter<"Usuario"> | string
    senha?: StringWithAggregatesFilter<"Usuario"> | string
    tipo?: EnumTipoUsuarioWithAggregatesFilter<"Usuario"> | $Enums.TipoUsuario
    ativo?: BoolWithAggregatesFilter<"Usuario"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
  }

  export type ProfissionalWhereInput = {
    AND?: ProfissionalWhereInput | ProfissionalWhereInput[]
    OR?: ProfissionalWhereInput[]
    NOT?: ProfissionalWhereInput | ProfissionalWhereInput[]
    id?: StringFilter<"Profissional"> | string
    tenantId?: StringFilter<"Profissional"> | string
    nome?: StringFilter<"Profissional"> | string
    especialidade?: StringNullableFilter<"Profissional"> | string | null
    observacoes?: StringNullableFilter<"Profissional"> | string | null
    ativo?: BoolFilter<"Profissional"> | boolean
    createdAt?: DateTimeFilter<"Profissional"> | Date | string
    updatedAt?: DateTimeFilter<"Profissional"> | Date | string
    agendamentos?: AgendamentoListRelationFilter
    atendimentos?: AtendimentoListRelationFilter
    pacientes?: PacienteListRelationFilter
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
  }

  export type ProfissionalOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    nome?: SortOrder
    especialidade?: SortOrderInput | SortOrder
    observacoes?: SortOrderInput | SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    agendamentos?: AgendamentoOrderByRelationAggregateInput
    atendimentos?: AtendimentoOrderByRelationAggregateInput
    pacientes?: PacienteOrderByRelationAggregateInput
    tenant?: TenantOrderByWithRelationInput
  }

  export type ProfissionalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProfissionalWhereInput | ProfissionalWhereInput[]
    OR?: ProfissionalWhereInput[]
    NOT?: ProfissionalWhereInput | ProfissionalWhereInput[]
    tenantId?: StringFilter<"Profissional"> | string
    nome?: StringFilter<"Profissional"> | string
    especialidade?: StringNullableFilter<"Profissional"> | string | null
    observacoes?: StringNullableFilter<"Profissional"> | string | null
    ativo?: BoolFilter<"Profissional"> | boolean
    createdAt?: DateTimeFilter<"Profissional"> | Date | string
    updatedAt?: DateTimeFilter<"Profissional"> | Date | string
    agendamentos?: AgendamentoListRelationFilter
    atendimentos?: AtendimentoListRelationFilter
    pacientes?: PacienteListRelationFilter
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
  }, "id">

  export type ProfissionalOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    nome?: SortOrder
    especialidade?: SortOrderInput | SortOrder
    observacoes?: SortOrderInput | SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProfissionalCountOrderByAggregateInput
    _max?: ProfissionalMaxOrderByAggregateInput
    _min?: ProfissionalMinOrderByAggregateInput
  }

  export type ProfissionalScalarWhereWithAggregatesInput = {
    AND?: ProfissionalScalarWhereWithAggregatesInput | ProfissionalScalarWhereWithAggregatesInput[]
    OR?: ProfissionalScalarWhereWithAggregatesInput[]
    NOT?: ProfissionalScalarWhereWithAggregatesInput | ProfissionalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Profissional"> | string
    tenantId?: StringWithAggregatesFilter<"Profissional"> | string
    nome?: StringWithAggregatesFilter<"Profissional"> | string
    especialidade?: StringNullableWithAggregatesFilter<"Profissional"> | string | null
    observacoes?: StringNullableWithAggregatesFilter<"Profissional"> | string | null
    ativo?: BoolWithAggregatesFilter<"Profissional"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Profissional"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Profissional"> | Date | string
  }

  export type PacienteWhereInput = {
    AND?: PacienteWhereInput | PacienteWhereInput[]
    OR?: PacienteWhereInput[]
    NOT?: PacienteWhereInput | PacienteWhereInput[]
    id?: StringFilter<"Paciente"> | string
    tenantId?: StringFilter<"Paciente"> | string
    profissionalId?: StringNullableFilter<"Paciente"> | string | null
    nome?: StringFilter<"Paciente"> | string
    telefone?: StringFilter<"Paciente"> | string
    email?: StringNullableFilter<"Paciente"> | string | null
    observacoes?: StringNullableFilter<"Paciente"> | string | null
    createdAt?: DateTimeFilter<"Paciente"> | Date | string
    updatedAt?: DateTimeFilter<"Paciente"> | Date | string
    agendamentos?: AgendamentoListRelationFilter
    atendimentos?: AtendimentoListRelationFilter
    profissional?: XOR<ProfissionalNullableScalarRelationFilter, ProfissionalWhereInput> | null
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
  }

  export type PacienteOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    profissionalId?: SortOrderInput | SortOrder
    nome?: SortOrder
    telefone?: SortOrder
    email?: SortOrderInput | SortOrder
    observacoes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    agendamentos?: AgendamentoOrderByRelationAggregateInput
    atendimentos?: AtendimentoOrderByRelationAggregateInput
    profissional?: ProfissionalOrderByWithRelationInput
    tenant?: TenantOrderByWithRelationInput
  }

  export type PacienteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PacienteWhereInput | PacienteWhereInput[]
    OR?: PacienteWhereInput[]
    NOT?: PacienteWhereInput | PacienteWhereInput[]
    tenantId?: StringFilter<"Paciente"> | string
    profissionalId?: StringNullableFilter<"Paciente"> | string | null
    nome?: StringFilter<"Paciente"> | string
    telefone?: StringFilter<"Paciente"> | string
    email?: StringNullableFilter<"Paciente"> | string | null
    observacoes?: StringNullableFilter<"Paciente"> | string | null
    createdAt?: DateTimeFilter<"Paciente"> | Date | string
    updatedAt?: DateTimeFilter<"Paciente"> | Date | string
    agendamentos?: AgendamentoListRelationFilter
    atendimentos?: AtendimentoListRelationFilter
    profissional?: XOR<ProfissionalNullableScalarRelationFilter, ProfissionalWhereInput> | null
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
  }, "id">

  export type PacienteOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    profissionalId?: SortOrderInput | SortOrder
    nome?: SortOrder
    telefone?: SortOrder
    email?: SortOrderInput | SortOrder
    observacoes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PacienteCountOrderByAggregateInput
    _max?: PacienteMaxOrderByAggregateInput
    _min?: PacienteMinOrderByAggregateInput
  }

  export type PacienteScalarWhereWithAggregatesInput = {
    AND?: PacienteScalarWhereWithAggregatesInput | PacienteScalarWhereWithAggregatesInput[]
    OR?: PacienteScalarWhereWithAggregatesInput[]
    NOT?: PacienteScalarWhereWithAggregatesInput | PacienteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Paciente"> | string
    tenantId?: StringWithAggregatesFilter<"Paciente"> | string
    profissionalId?: StringNullableWithAggregatesFilter<"Paciente"> | string | null
    nome?: StringWithAggregatesFilter<"Paciente"> | string
    telefone?: StringWithAggregatesFilter<"Paciente"> | string
    email?: StringNullableWithAggregatesFilter<"Paciente"> | string | null
    observacoes?: StringNullableWithAggregatesFilter<"Paciente"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Paciente"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Paciente"> | Date | string
  }

  export type ProcedimentoWhereInput = {
    AND?: ProcedimentoWhereInput | ProcedimentoWhereInput[]
    OR?: ProcedimentoWhereInput[]
    NOT?: ProcedimentoWhereInput | ProcedimentoWhereInput[]
    id?: StringFilter<"Procedimento"> | string
    tenantId?: StringFilter<"Procedimento"> | string
    nome?: StringFilter<"Procedimento"> | string
    valor?: DecimalNullableFilter<"Procedimento"> | Decimal | DecimalJsLike | number | string | null
    duracaoMinutos?: IntFilter<"Procedimento"> | number
    createdAt?: DateTimeFilter<"Procedimento"> | Date | string
    updatedAt?: DateTimeFilter<"Procedimento"> | Date | string
    agendamentos?: AgendamentoListRelationFilter
    atendimentos?: AtendimentoListRelationFilter
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
  }

  export type ProcedimentoOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    nome?: SortOrder
    valor?: SortOrderInput | SortOrder
    duracaoMinutos?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    agendamentos?: AgendamentoOrderByRelationAggregateInput
    atendimentos?: AtendimentoOrderByRelationAggregateInput
    tenant?: TenantOrderByWithRelationInput
  }

  export type ProcedimentoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProcedimentoWhereInput | ProcedimentoWhereInput[]
    OR?: ProcedimentoWhereInput[]
    NOT?: ProcedimentoWhereInput | ProcedimentoWhereInput[]
    tenantId?: StringFilter<"Procedimento"> | string
    nome?: StringFilter<"Procedimento"> | string
    valor?: DecimalNullableFilter<"Procedimento"> | Decimal | DecimalJsLike | number | string | null
    duracaoMinutos?: IntFilter<"Procedimento"> | number
    createdAt?: DateTimeFilter<"Procedimento"> | Date | string
    updatedAt?: DateTimeFilter<"Procedimento"> | Date | string
    agendamentos?: AgendamentoListRelationFilter
    atendimentos?: AtendimentoListRelationFilter
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
  }, "id">

  export type ProcedimentoOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    nome?: SortOrder
    valor?: SortOrderInput | SortOrder
    duracaoMinutos?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProcedimentoCountOrderByAggregateInput
    _avg?: ProcedimentoAvgOrderByAggregateInput
    _max?: ProcedimentoMaxOrderByAggregateInput
    _min?: ProcedimentoMinOrderByAggregateInput
    _sum?: ProcedimentoSumOrderByAggregateInput
  }

  export type ProcedimentoScalarWhereWithAggregatesInput = {
    AND?: ProcedimentoScalarWhereWithAggregatesInput | ProcedimentoScalarWhereWithAggregatesInput[]
    OR?: ProcedimentoScalarWhereWithAggregatesInput[]
    NOT?: ProcedimentoScalarWhereWithAggregatesInput | ProcedimentoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Procedimento"> | string
    tenantId?: StringWithAggregatesFilter<"Procedimento"> | string
    nome?: StringWithAggregatesFilter<"Procedimento"> | string
    valor?: DecimalNullableWithAggregatesFilter<"Procedimento"> | Decimal | DecimalJsLike | number | string | null
    duracaoMinutos?: IntWithAggregatesFilter<"Procedimento"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Procedimento"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Procedimento"> | Date | string
  }

  export type AgendamentoWhereInput = {
    AND?: AgendamentoWhereInput | AgendamentoWhereInput[]
    OR?: AgendamentoWhereInput[]
    NOT?: AgendamentoWhereInput | AgendamentoWhereInput[]
    id?: StringFilter<"Agendamento"> | string
    tenantId?: StringFilter<"Agendamento"> | string
    pacienteId?: StringNullableFilter<"Agendamento"> | string | null
    profissionalId?: StringFilter<"Agendamento"> | string
    procedimentoId?: StringFilter<"Agendamento"> | string
    dataHora?: DateTimeFilter<"Agendamento"> | Date | string
    status?: EnumStatusAgendamentoFilter<"Agendamento"> | $Enums.StatusAgendamento
    observacoes?: StringNullableFilter<"Agendamento"> | string | null
    confirmacaoEnviada?: BoolFilter<"Agendamento"> | boolean
    createdAt?: DateTimeFilter<"Agendamento"> | Date | string
    updatedAt?: DateTimeFilter<"Agendamento"> | Date | string
    dataHoraFim?: DateTimeFilter<"Agendamento"> | Date | string
    paciente?: XOR<PacienteNullableScalarRelationFilter, PacienteWhereInput> | null
    procedimento?: XOR<ProcedimentoScalarRelationFilter, ProcedimentoWhereInput>
    profissional?: XOR<ProfissionalScalarRelationFilter, ProfissionalWhereInput>
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    atendimento?: XOR<AtendimentoNullableScalarRelationFilter, AtendimentoWhereInput> | null
  }

  export type AgendamentoOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    pacienteId?: SortOrderInput | SortOrder
    profissionalId?: SortOrder
    procedimentoId?: SortOrder
    dataHora?: SortOrder
    status?: SortOrder
    observacoes?: SortOrderInput | SortOrder
    confirmacaoEnviada?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    dataHoraFim?: SortOrder
    paciente?: PacienteOrderByWithRelationInput
    procedimento?: ProcedimentoOrderByWithRelationInput
    profissional?: ProfissionalOrderByWithRelationInput
    tenant?: TenantOrderByWithRelationInput
    atendimento?: AtendimentoOrderByWithRelationInput
  }

  export type AgendamentoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AgendamentoWhereInput | AgendamentoWhereInput[]
    OR?: AgendamentoWhereInput[]
    NOT?: AgendamentoWhereInput | AgendamentoWhereInput[]
    tenantId?: StringFilter<"Agendamento"> | string
    pacienteId?: StringNullableFilter<"Agendamento"> | string | null
    profissionalId?: StringFilter<"Agendamento"> | string
    procedimentoId?: StringFilter<"Agendamento"> | string
    dataHora?: DateTimeFilter<"Agendamento"> | Date | string
    status?: EnumStatusAgendamentoFilter<"Agendamento"> | $Enums.StatusAgendamento
    observacoes?: StringNullableFilter<"Agendamento"> | string | null
    confirmacaoEnviada?: BoolFilter<"Agendamento"> | boolean
    createdAt?: DateTimeFilter<"Agendamento"> | Date | string
    updatedAt?: DateTimeFilter<"Agendamento"> | Date | string
    dataHoraFim?: DateTimeFilter<"Agendamento"> | Date | string
    paciente?: XOR<PacienteNullableScalarRelationFilter, PacienteWhereInput> | null
    procedimento?: XOR<ProcedimentoScalarRelationFilter, ProcedimentoWhereInput>
    profissional?: XOR<ProfissionalScalarRelationFilter, ProfissionalWhereInput>
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    atendimento?: XOR<AtendimentoNullableScalarRelationFilter, AtendimentoWhereInput> | null
  }, "id">

  export type AgendamentoOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    pacienteId?: SortOrderInput | SortOrder
    profissionalId?: SortOrder
    procedimentoId?: SortOrder
    dataHora?: SortOrder
    status?: SortOrder
    observacoes?: SortOrderInput | SortOrder
    confirmacaoEnviada?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    dataHoraFim?: SortOrder
    _count?: AgendamentoCountOrderByAggregateInput
    _max?: AgendamentoMaxOrderByAggregateInput
    _min?: AgendamentoMinOrderByAggregateInput
  }

  export type AgendamentoScalarWhereWithAggregatesInput = {
    AND?: AgendamentoScalarWhereWithAggregatesInput | AgendamentoScalarWhereWithAggregatesInput[]
    OR?: AgendamentoScalarWhereWithAggregatesInput[]
    NOT?: AgendamentoScalarWhereWithAggregatesInput | AgendamentoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Agendamento"> | string
    tenantId?: StringWithAggregatesFilter<"Agendamento"> | string
    pacienteId?: StringNullableWithAggregatesFilter<"Agendamento"> | string | null
    profissionalId?: StringWithAggregatesFilter<"Agendamento"> | string
    procedimentoId?: StringWithAggregatesFilter<"Agendamento"> | string
    dataHora?: DateTimeWithAggregatesFilter<"Agendamento"> | Date | string
    status?: EnumStatusAgendamentoWithAggregatesFilter<"Agendamento"> | $Enums.StatusAgendamento
    observacoes?: StringNullableWithAggregatesFilter<"Agendamento"> | string | null
    confirmacaoEnviada?: BoolWithAggregatesFilter<"Agendamento"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Agendamento"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Agendamento"> | Date | string
    dataHoraFim?: DateTimeWithAggregatesFilter<"Agendamento"> | Date | string
  }

  export type AtendimentoWhereInput = {
    AND?: AtendimentoWhereInput | AtendimentoWhereInput[]
    OR?: AtendimentoWhereInput[]
    NOT?: AtendimentoWhereInput | AtendimentoWhereInput[]
    id?: StringFilter<"Atendimento"> | string
    tenantId?: StringFilter<"Atendimento"> | string
    agendamentoId?: StringFilter<"Atendimento"> | string
    pacienteId?: StringFilter<"Atendimento"> | string
    profissionalId?: StringFilter<"Atendimento"> | string
    procedimentoId?: StringFilter<"Atendimento"> | string
    anotacoes?: StringNullableFilter<"Atendimento"> | string | null
    procedimentosRealizados?: JsonNullableFilter<"Atendimento">
    createdAt?: DateTimeFilter<"Atendimento"> | Date | string
    updatedAt?: DateTimeFilter<"Atendimento"> | Date | string
    agendamento?: XOR<AgendamentoScalarRelationFilter, AgendamentoWhereInput>
    paciente?: XOR<PacienteScalarRelationFilter, PacienteWhereInput>
    procedimento?: XOR<ProcedimentoScalarRelationFilter, ProcedimentoWhereInput>
    profissional?: XOR<ProfissionalScalarRelationFilter, ProfissionalWhereInput>
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
  }

  export type AtendimentoOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    agendamentoId?: SortOrder
    pacienteId?: SortOrder
    profissionalId?: SortOrder
    procedimentoId?: SortOrder
    anotacoes?: SortOrderInput | SortOrder
    procedimentosRealizados?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    agendamento?: AgendamentoOrderByWithRelationInput
    paciente?: PacienteOrderByWithRelationInput
    procedimento?: ProcedimentoOrderByWithRelationInput
    profissional?: ProfissionalOrderByWithRelationInput
    tenant?: TenantOrderByWithRelationInput
  }

  export type AtendimentoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    agendamentoId?: string
    AND?: AtendimentoWhereInput | AtendimentoWhereInput[]
    OR?: AtendimentoWhereInput[]
    NOT?: AtendimentoWhereInput | AtendimentoWhereInput[]
    tenantId?: StringFilter<"Atendimento"> | string
    pacienteId?: StringFilter<"Atendimento"> | string
    profissionalId?: StringFilter<"Atendimento"> | string
    procedimentoId?: StringFilter<"Atendimento"> | string
    anotacoes?: StringNullableFilter<"Atendimento"> | string | null
    procedimentosRealizados?: JsonNullableFilter<"Atendimento">
    createdAt?: DateTimeFilter<"Atendimento"> | Date | string
    updatedAt?: DateTimeFilter<"Atendimento"> | Date | string
    agendamento?: XOR<AgendamentoScalarRelationFilter, AgendamentoWhereInput>
    paciente?: XOR<PacienteScalarRelationFilter, PacienteWhereInput>
    procedimento?: XOR<ProcedimentoScalarRelationFilter, ProcedimentoWhereInput>
    profissional?: XOR<ProfissionalScalarRelationFilter, ProfissionalWhereInput>
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
  }, "id" | "agendamentoId">

  export type AtendimentoOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    agendamentoId?: SortOrder
    pacienteId?: SortOrder
    profissionalId?: SortOrder
    procedimentoId?: SortOrder
    anotacoes?: SortOrderInput | SortOrder
    procedimentosRealizados?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AtendimentoCountOrderByAggregateInput
    _max?: AtendimentoMaxOrderByAggregateInput
    _min?: AtendimentoMinOrderByAggregateInput
  }

  export type AtendimentoScalarWhereWithAggregatesInput = {
    AND?: AtendimentoScalarWhereWithAggregatesInput | AtendimentoScalarWhereWithAggregatesInput[]
    OR?: AtendimentoScalarWhereWithAggregatesInput[]
    NOT?: AtendimentoScalarWhereWithAggregatesInput | AtendimentoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Atendimento"> | string
    tenantId?: StringWithAggregatesFilter<"Atendimento"> | string
    agendamentoId?: StringWithAggregatesFilter<"Atendimento"> | string
    pacienteId?: StringWithAggregatesFilter<"Atendimento"> | string
    profissionalId?: StringWithAggregatesFilter<"Atendimento"> | string
    procedimentoId?: StringWithAggregatesFilter<"Atendimento"> | string
    anotacoes?: StringNullableWithAggregatesFilter<"Atendimento"> | string | null
    procedimentosRealizados?: JsonNullableWithAggregatesFilter<"Atendimento">
    createdAt?: DateTimeWithAggregatesFilter<"Atendimento"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Atendimento"> | Date | string
  }

  export type WhatsAppConfigWhereInput = {
    AND?: WhatsAppConfigWhereInput | WhatsAppConfigWhereInput[]
    OR?: WhatsAppConfigWhereInput[]
    NOT?: WhatsAppConfigWhereInput | WhatsAppConfigWhereInput[]
    id?: StringFilter<"WhatsAppConfig"> | string
    tenantId?: StringFilter<"WhatsAppConfig"> | string
    templateConfirmacao?: StringFilter<"WhatsAppConfig"> | string
    templateSim?: StringFilter<"WhatsAppConfig"> | string
    templateNao?: StringFilter<"WhatsAppConfig"> | string
    templateOpcoesInvalidas?: StringFilter<"WhatsAppConfig"> | string
    horasAntecedencia?: IntFilter<"WhatsAppConfig"> | number
    ativo?: BoolFilter<"WhatsAppConfig"> | boolean
    createdAt?: DateTimeFilter<"WhatsAppConfig"> | Date | string
    updatedAt?: DateTimeFilter<"WhatsAppConfig"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
  }

  export type WhatsAppConfigOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    templateConfirmacao?: SortOrder
    templateSim?: SortOrder
    templateNao?: SortOrder
    templateOpcoesInvalidas?: SortOrder
    horasAntecedencia?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
  }

  export type WhatsAppConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId?: string
    AND?: WhatsAppConfigWhereInput | WhatsAppConfigWhereInput[]
    OR?: WhatsAppConfigWhereInput[]
    NOT?: WhatsAppConfigWhereInput | WhatsAppConfigWhereInput[]
    templateConfirmacao?: StringFilter<"WhatsAppConfig"> | string
    templateSim?: StringFilter<"WhatsAppConfig"> | string
    templateNao?: StringFilter<"WhatsAppConfig"> | string
    templateOpcoesInvalidas?: StringFilter<"WhatsAppConfig"> | string
    horasAntecedencia?: IntFilter<"WhatsAppConfig"> | number
    ativo?: BoolFilter<"WhatsAppConfig"> | boolean
    createdAt?: DateTimeFilter<"WhatsAppConfig"> | Date | string
    updatedAt?: DateTimeFilter<"WhatsAppConfig"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
  }, "id" | "tenantId">

  export type WhatsAppConfigOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    templateConfirmacao?: SortOrder
    templateSim?: SortOrder
    templateNao?: SortOrder
    templateOpcoesInvalidas?: SortOrder
    horasAntecedencia?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WhatsAppConfigCountOrderByAggregateInput
    _avg?: WhatsAppConfigAvgOrderByAggregateInput
    _max?: WhatsAppConfigMaxOrderByAggregateInput
    _min?: WhatsAppConfigMinOrderByAggregateInput
    _sum?: WhatsAppConfigSumOrderByAggregateInput
  }

  export type WhatsAppConfigScalarWhereWithAggregatesInput = {
    AND?: WhatsAppConfigScalarWhereWithAggregatesInput | WhatsAppConfigScalarWhereWithAggregatesInput[]
    OR?: WhatsAppConfigScalarWhereWithAggregatesInput[]
    NOT?: WhatsAppConfigScalarWhereWithAggregatesInput | WhatsAppConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WhatsAppConfig"> | string
    tenantId?: StringWithAggregatesFilter<"WhatsAppConfig"> | string
    templateConfirmacao?: StringWithAggregatesFilter<"WhatsAppConfig"> | string
    templateSim?: StringWithAggregatesFilter<"WhatsAppConfig"> | string
    templateNao?: StringWithAggregatesFilter<"WhatsAppConfig"> | string
    templateOpcoesInvalidas?: StringWithAggregatesFilter<"WhatsAppConfig"> | string
    horasAntecedencia?: IntWithAggregatesFilter<"WhatsAppConfig"> | number
    ativo?: BoolWithAggregatesFilter<"WhatsAppConfig"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"WhatsAppConfig"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WhatsAppConfig"> | Date | string
  }

  export type LogSistemaWhereInput = {
    AND?: LogSistemaWhereInput | LogSistemaWhereInput[]
    OR?: LogSistemaWhereInput[]
    NOT?: LogSistemaWhereInput | LogSistemaWhereInput[]
    id?: StringFilter<"LogSistema"> | string
    tenantId?: StringFilter<"LogSistema"> | string
    usuarioId?: StringNullableFilter<"LogSistema"> | string | null
    tipo?: EnumTipoLogFilter<"LogSistema"> | $Enums.TipoLog
    descricao?: StringFilter<"LogSistema"> | string
    metadata?: JsonNullableFilter<"LogSistema">
    createdAt?: DateTimeFilter<"LogSistema"> | Date | string
  }

  export type LogSistemaOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    usuarioId?: SortOrderInput | SortOrder
    tipo?: SortOrder
    descricao?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type LogSistemaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LogSistemaWhereInput | LogSistemaWhereInput[]
    OR?: LogSistemaWhereInput[]
    NOT?: LogSistemaWhereInput | LogSistemaWhereInput[]
    tenantId?: StringFilter<"LogSistema"> | string
    usuarioId?: StringNullableFilter<"LogSistema"> | string | null
    tipo?: EnumTipoLogFilter<"LogSistema"> | $Enums.TipoLog
    descricao?: StringFilter<"LogSistema"> | string
    metadata?: JsonNullableFilter<"LogSistema">
    createdAt?: DateTimeFilter<"LogSistema"> | Date | string
  }, "id">

  export type LogSistemaOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    usuarioId?: SortOrderInput | SortOrder
    tipo?: SortOrder
    descricao?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: LogSistemaCountOrderByAggregateInput
    _max?: LogSistemaMaxOrderByAggregateInput
    _min?: LogSistemaMinOrderByAggregateInput
  }

  export type LogSistemaScalarWhereWithAggregatesInput = {
    AND?: LogSistemaScalarWhereWithAggregatesInput | LogSistemaScalarWhereWithAggregatesInput[]
    OR?: LogSistemaScalarWhereWithAggregatesInput[]
    NOT?: LogSistemaScalarWhereWithAggregatesInput | LogSistemaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LogSistema"> | string
    tenantId?: StringWithAggregatesFilter<"LogSistema"> | string
    usuarioId?: StringNullableWithAggregatesFilter<"LogSistema"> | string | null
    tipo?: EnumTipoLogWithAggregatesFilter<"LogSistema"> | $Enums.TipoLog
    descricao?: StringWithAggregatesFilter<"LogSistema"> | string
    metadata?: JsonNullableWithAggregatesFilter<"LogSistema">
    createdAt?: DateTimeWithAggregatesFilter<"LogSistema"> | Date | string
  }

  export type TenantCreateInput = {
    id?: string
    nome: string
    plano?: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoCreateNestedManyWithoutTenantInput
    atendimentos?: AtendimentoCreateNestedManyWithoutTenantInput
    pacientes?: PacienteCreateNestedManyWithoutTenantInput
    procedimentos?: ProcedimentoCreateNestedManyWithoutTenantInput
    profissionais?: ProfissionalCreateNestedManyWithoutTenantInput
    usuarios?: UsuarioCreateNestedManyWithoutTenantInput
    whatsappConfig?: WhatsAppConfigCreateNestedOneWithoutTenantInput
  }

  export type TenantUncheckedCreateInput = {
    id?: string
    nome: string
    plano?: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoUncheckedCreateNestedManyWithoutTenantInput
    atendimentos?: AtendimentoUncheckedCreateNestedManyWithoutTenantInput
    pacientes?: PacienteUncheckedCreateNestedManyWithoutTenantInput
    procedimentos?: ProcedimentoUncheckedCreateNestedManyWithoutTenantInput
    profissionais?: ProfissionalUncheckedCreateNestedManyWithoutTenantInput
    usuarios?: UsuarioUncheckedCreateNestedManyWithoutTenantInput
    whatsappConfig?: WhatsAppConfigUncheckedCreateNestedOneWithoutTenantInput
  }

  export type TenantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUpdateManyWithoutTenantNestedInput
    atendimentos?: AtendimentoUpdateManyWithoutTenantNestedInput
    pacientes?: PacienteUpdateManyWithoutTenantNestedInput
    procedimentos?: ProcedimentoUpdateManyWithoutTenantNestedInput
    profissionais?: ProfissionalUpdateManyWithoutTenantNestedInput
    usuarios?: UsuarioUpdateManyWithoutTenantNestedInput
    whatsappConfig?: WhatsAppConfigUpdateOneWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUncheckedUpdateManyWithoutTenantNestedInput
    atendimentos?: AtendimentoUncheckedUpdateManyWithoutTenantNestedInput
    pacientes?: PacienteUncheckedUpdateManyWithoutTenantNestedInput
    procedimentos?: ProcedimentoUncheckedUpdateManyWithoutTenantNestedInput
    profissionais?: ProfissionalUncheckedUpdateManyWithoutTenantNestedInput
    usuarios?: UsuarioUncheckedUpdateManyWithoutTenantNestedInput
    whatsappConfig?: WhatsAppConfigUncheckedUpdateOneWithoutTenantNestedInput
  }

  export type TenantCreateManyInput = {
    id?: string
    nome: string
    plano?: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TenantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioCreateInput = {
    id?: string
    nome: string
    email: string
    senha: string
    tipo?: $Enums.TipoUsuario
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutUsuariosInput
  }

  export type UsuarioUncheckedCreateInput = {
    id?: string
    tenantId: string
    nome: string
    email: string
    senha: string
    tipo?: $Enums.TipoUsuario
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsuarioUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutUsuariosNestedInput
  }

  export type UsuarioUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioCreateManyInput = {
    id?: string
    tenantId: string
    nome: string
    email: string
    senha: string
    tipo?: $Enums.TipoUsuario
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsuarioUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfissionalCreateInput = {
    id?: string
    nome: string
    especialidade?: string | null
    observacoes?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoCreateNestedManyWithoutProfissionalInput
    atendimentos?: AtendimentoCreateNestedManyWithoutProfissionalInput
    pacientes?: PacienteCreateNestedManyWithoutProfissionalInput
    tenant: TenantCreateNestedOneWithoutProfissionaisInput
  }

  export type ProfissionalUncheckedCreateInput = {
    id?: string
    tenantId: string
    nome: string
    especialidade?: string | null
    observacoes?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoUncheckedCreateNestedManyWithoutProfissionalInput
    atendimentos?: AtendimentoUncheckedCreateNestedManyWithoutProfissionalInput
    pacientes?: PacienteUncheckedCreateNestedManyWithoutProfissionalInput
  }

  export type ProfissionalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    especialidade?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUpdateManyWithoutProfissionalNestedInput
    atendimentos?: AtendimentoUpdateManyWithoutProfissionalNestedInput
    pacientes?: PacienteUpdateManyWithoutProfissionalNestedInput
    tenant?: TenantUpdateOneRequiredWithoutProfissionaisNestedInput
  }

  export type ProfissionalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    especialidade?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUncheckedUpdateManyWithoutProfissionalNestedInput
    atendimentos?: AtendimentoUncheckedUpdateManyWithoutProfissionalNestedInput
    pacientes?: PacienteUncheckedUpdateManyWithoutProfissionalNestedInput
  }

  export type ProfissionalCreateManyInput = {
    id?: string
    tenantId: string
    nome: string
    especialidade?: string | null
    observacoes?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfissionalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    especialidade?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfissionalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    especialidade?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PacienteCreateInput = {
    id?: string
    nome: string
    telefone: string
    email?: string | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoCreateNestedManyWithoutPacienteInput
    atendimentos?: AtendimentoCreateNestedManyWithoutPacienteInput
    profissional?: ProfissionalCreateNestedOneWithoutPacientesInput
    tenant: TenantCreateNestedOneWithoutPacientesInput
  }

  export type PacienteUncheckedCreateInput = {
    id?: string
    tenantId: string
    profissionalId?: string | null
    nome: string
    telefone: string
    email?: string | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoUncheckedCreateNestedManyWithoutPacienteInput
    atendimentos?: AtendimentoUncheckedCreateNestedManyWithoutPacienteInput
  }

  export type PacienteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUpdateManyWithoutPacienteNestedInput
    atendimentos?: AtendimentoUpdateManyWithoutPacienteNestedInput
    profissional?: ProfissionalUpdateOneWithoutPacientesNestedInput
    tenant?: TenantUpdateOneRequiredWithoutPacientesNestedInput
  }

  export type PacienteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    profissionalId?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUncheckedUpdateManyWithoutPacienteNestedInput
    atendimentos?: AtendimentoUncheckedUpdateManyWithoutPacienteNestedInput
  }

  export type PacienteCreateManyInput = {
    id?: string
    tenantId: string
    profissionalId?: string | null
    nome: string
    telefone: string
    email?: string | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PacienteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PacienteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    profissionalId?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcedimentoCreateInput = {
    id?: string
    nome: string
    valor?: Decimal | DecimalJsLike | number | string | null
    duracaoMinutos: number
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoCreateNestedManyWithoutProcedimentoInput
    atendimentos?: AtendimentoCreateNestedManyWithoutProcedimentoInput
    tenant: TenantCreateNestedOneWithoutProcedimentosInput
  }

  export type ProcedimentoUncheckedCreateInput = {
    id?: string
    tenantId: string
    nome: string
    valor?: Decimal | DecimalJsLike | number | string | null
    duracaoMinutos: number
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoUncheckedCreateNestedManyWithoutProcedimentoInput
    atendimentos?: AtendimentoUncheckedCreateNestedManyWithoutProcedimentoInput
  }

  export type ProcedimentoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    valor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    duracaoMinutos?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUpdateManyWithoutProcedimentoNestedInput
    atendimentos?: AtendimentoUpdateManyWithoutProcedimentoNestedInput
    tenant?: TenantUpdateOneRequiredWithoutProcedimentosNestedInput
  }

  export type ProcedimentoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    valor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    duracaoMinutos?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUncheckedUpdateManyWithoutProcedimentoNestedInput
    atendimentos?: AtendimentoUncheckedUpdateManyWithoutProcedimentoNestedInput
  }

  export type ProcedimentoCreateManyInput = {
    id?: string
    tenantId: string
    nome: string
    valor?: Decimal | DecimalJsLike | number | string | null
    duracaoMinutos: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProcedimentoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    valor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    duracaoMinutos?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcedimentoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    valor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    duracaoMinutos?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgendamentoCreateInput = {
    id?: string
    dataHora: Date | string
    status?: $Enums.StatusAgendamento
    observacoes?: string | null
    confirmacaoEnviada?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dataHoraFim: Date | string
    paciente?: PacienteCreateNestedOneWithoutAgendamentosInput
    procedimento: ProcedimentoCreateNestedOneWithoutAgendamentosInput
    profissional: ProfissionalCreateNestedOneWithoutAgendamentosInput
    tenant: TenantCreateNestedOneWithoutAgendamentosInput
    atendimento?: AtendimentoCreateNestedOneWithoutAgendamentoInput
  }

  export type AgendamentoUncheckedCreateInput = {
    id?: string
    tenantId: string
    pacienteId?: string | null
    profissionalId: string
    procedimentoId: string
    dataHora: Date | string
    status?: $Enums.StatusAgendamento
    observacoes?: string | null
    confirmacaoEnviada?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dataHoraFim: Date | string
    atendimento?: AtendimentoUncheckedCreateNestedOneWithoutAgendamentoInput
  }

  export type AgendamentoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dataHora?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusAgendamentoFieldUpdateOperationsInput | $Enums.StatusAgendamento
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    confirmacaoEnviada?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataHoraFim?: DateTimeFieldUpdateOperationsInput | Date | string
    paciente?: PacienteUpdateOneWithoutAgendamentosNestedInput
    procedimento?: ProcedimentoUpdateOneRequiredWithoutAgendamentosNestedInput
    profissional?: ProfissionalUpdateOneRequiredWithoutAgendamentosNestedInput
    tenant?: TenantUpdateOneRequiredWithoutAgendamentosNestedInput
    atendimento?: AtendimentoUpdateOneWithoutAgendamentoNestedInput
  }

  export type AgendamentoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    pacienteId?: NullableStringFieldUpdateOperationsInput | string | null
    profissionalId?: StringFieldUpdateOperationsInput | string
    procedimentoId?: StringFieldUpdateOperationsInput | string
    dataHora?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusAgendamentoFieldUpdateOperationsInput | $Enums.StatusAgendamento
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    confirmacaoEnviada?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataHoraFim?: DateTimeFieldUpdateOperationsInput | Date | string
    atendimento?: AtendimentoUncheckedUpdateOneWithoutAgendamentoNestedInput
  }

  export type AgendamentoCreateManyInput = {
    id?: string
    tenantId: string
    pacienteId?: string | null
    profissionalId: string
    procedimentoId: string
    dataHora: Date | string
    status?: $Enums.StatusAgendamento
    observacoes?: string | null
    confirmacaoEnviada?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dataHoraFim: Date | string
  }

  export type AgendamentoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dataHora?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusAgendamentoFieldUpdateOperationsInput | $Enums.StatusAgendamento
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    confirmacaoEnviada?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataHoraFim?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgendamentoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    pacienteId?: NullableStringFieldUpdateOperationsInput | string | null
    profissionalId?: StringFieldUpdateOperationsInput | string
    procedimentoId?: StringFieldUpdateOperationsInput | string
    dataHora?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusAgendamentoFieldUpdateOperationsInput | $Enums.StatusAgendamento
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    confirmacaoEnviada?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataHoraFim?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AtendimentoCreateInput = {
    id?: string
    anotacoes?: string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamento: AgendamentoCreateNestedOneWithoutAtendimentoInput
    paciente: PacienteCreateNestedOneWithoutAtendimentosInput
    procedimento: ProcedimentoCreateNestedOneWithoutAtendimentosInput
    profissional: ProfissionalCreateNestedOneWithoutAtendimentosInput
    tenant: TenantCreateNestedOneWithoutAtendimentosInput
  }

  export type AtendimentoUncheckedCreateInput = {
    id?: string
    tenantId: string
    agendamentoId: string
    pacienteId: string
    profissionalId: string
    procedimentoId: string
    anotacoes?: string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AtendimentoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    anotacoes?: NullableStringFieldUpdateOperationsInput | string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamento?: AgendamentoUpdateOneRequiredWithoutAtendimentoNestedInput
    paciente?: PacienteUpdateOneRequiredWithoutAtendimentosNestedInput
    procedimento?: ProcedimentoUpdateOneRequiredWithoutAtendimentosNestedInput
    profissional?: ProfissionalUpdateOneRequiredWithoutAtendimentosNestedInput
    tenant?: TenantUpdateOneRequiredWithoutAtendimentosNestedInput
  }

  export type AtendimentoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    agendamentoId?: StringFieldUpdateOperationsInput | string
    pacienteId?: StringFieldUpdateOperationsInput | string
    profissionalId?: StringFieldUpdateOperationsInput | string
    procedimentoId?: StringFieldUpdateOperationsInput | string
    anotacoes?: NullableStringFieldUpdateOperationsInput | string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AtendimentoCreateManyInput = {
    id?: string
    tenantId: string
    agendamentoId: string
    pacienteId: string
    profissionalId: string
    procedimentoId: string
    anotacoes?: string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AtendimentoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    anotacoes?: NullableStringFieldUpdateOperationsInput | string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AtendimentoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    agendamentoId?: StringFieldUpdateOperationsInput | string
    pacienteId?: StringFieldUpdateOperationsInput | string
    profissionalId?: StringFieldUpdateOperationsInput | string
    procedimentoId?: StringFieldUpdateOperationsInput | string
    anotacoes?: NullableStringFieldUpdateOperationsInput | string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WhatsAppConfigCreateInput = {
    id?: string
    templateConfirmacao?: string
    templateSim?: string
    templateNao?: string
    templateOpcoesInvalidas?: string
    horasAntecedencia?: number
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutWhatsappConfigInput
  }

  export type WhatsAppConfigUncheckedCreateInput = {
    id?: string
    tenantId: string
    templateConfirmacao?: string
    templateSim?: string
    templateNao?: string
    templateOpcoesInvalidas?: string
    horasAntecedencia?: number
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WhatsAppConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    templateConfirmacao?: StringFieldUpdateOperationsInput | string
    templateSim?: StringFieldUpdateOperationsInput | string
    templateNao?: StringFieldUpdateOperationsInput | string
    templateOpcoesInvalidas?: StringFieldUpdateOperationsInput | string
    horasAntecedencia?: IntFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutWhatsappConfigNestedInput
  }

  export type WhatsAppConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    templateConfirmacao?: StringFieldUpdateOperationsInput | string
    templateSim?: StringFieldUpdateOperationsInput | string
    templateNao?: StringFieldUpdateOperationsInput | string
    templateOpcoesInvalidas?: StringFieldUpdateOperationsInput | string
    horasAntecedencia?: IntFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WhatsAppConfigCreateManyInput = {
    id?: string
    tenantId: string
    templateConfirmacao?: string
    templateSim?: string
    templateNao?: string
    templateOpcoesInvalidas?: string
    horasAntecedencia?: number
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WhatsAppConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    templateConfirmacao?: StringFieldUpdateOperationsInput | string
    templateSim?: StringFieldUpdateOperationsInput | string
    templateNao?: StringFieldUpdateOperationsInput | string
    templateOpcoesInvalidas?: StringFieldUpdateOperationsInput | string
    horasAntecedencia?: IntFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WhatsAppConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    templateConfirmacao?: StringFieldUpdateOperationsInput | string
    templateSim?: StringFieldUpdateOperationsInput | string
    templateNao?: StringFieldUpdateOperationsInput | string
    templateOpcoesInvalidas?: StringFieldUpdateOperationsInput | string
    horasAntecedencia?: IntFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LogSistemaCreateInput = {
    id?: string
    tenantId: string
    usuarioId?: string | null
    tipo: $Enums.TipoLog
    descricao: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type LogSistemaUncheckedCreateInput = {
    id?: string
    tenantId: string
    usuarioId?: string | null
    tipo: $Enums.TipoLog
    descricao: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type LogSistemaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    usuarioId?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: EnumTipoLogFieldUpdateOperationsInput | $Enums.TipoLog
    descricao?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LogSistemaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    usuarioId?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: EnumTipoLogFieldUpdateOperationsInput | $Enums.TipoLog
    descricao?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LogSistemaCreateManyInput = {
    id?: string
    tenantId: string
    usuarioId?: string | null
    tipo: $Enums.TipoLog
    descricao: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type LogSistemaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    usuarioId?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: EnumTipoLogFieldUpdateOperationsInput | $Enums.TipoLog
    descricao?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LogSistemaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    usuarioId?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: EnumTipoLogFieldUpdateOperationsInput | $Enums.TipoLog
    descricao?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type AgendamentoListRelationFilter = {
    every?: AgendamentoWhereInput
    some?: AgendamentoWhereInput
    none?: AgendamentoWhereInput
  }

  export type AtendimentoListRelationFilter = {
    every?: AtendimentoWhereInput
    some?: AtendimentoWhereInput
    none?: AtendimentoWhereInput
  }

  export type PacienteListRelationFilter = {
    every?: PacienteWhereInput
    some?: PacienteWhereInput
    none?: PacienteWhereInput
  }

  export type ProcedimentoListRelationFilter = {
    every?: ProcedimentoWhereInput
    some?: ProcedimentoWhereInput
    none?: ProcedimentoWhereInput
  }

  export type ProfissionalListRelationFilter = {
    every?: ProfissionalWhereInput
    some?: ProfissionalWhereInput
    none?: ProfissionalWhereInput
  }

  export type UsuarioListRelationFilter = {
    every?: UsuarioWhereInput
    some?: UsuarioWhereInput
    none?: UsuarioWhereInput
  }

  export type WhatsAppConfigNullableScalarRelationFilter = {
    is?: WhatsAppConfigWhereInput | null
    isNot?: WhatsAppConfigWhereInput | null
  }

  export type AgendamentoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AtendimentoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PacienteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProcedimentoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProfissionalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsuarioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TenantCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    plano?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TenantMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    plano?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TenantMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    plano?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type EnumTipoUsuarioFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoUsuario | EnumTipoUsuarioFieldRefInput<$PrismaModel>
    in?: $Enums.TipoUsuario[] | ListEnumTipoUsuarioFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoUsuario[] | ListEnumTipoUsuarioFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoUsuarioFilter<$PrismaModel> | $Enums.TipoUsuario
  }

  export type TenantScalarRelationFilter = {
    is?: TenantWhereInput
    isNot?: TenantWhereInput
  }

  export type UsuarioTenantIdEmailCompoundUniqueInput = {
    tenantId: string
    email: string
  }

  export type UsuarioCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    tipo?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsuarioMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    tipo?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsuarioMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    tipo?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumTipoUsuarioWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoUsuario | EnumTipoUsuarioFieldRefInput<$PrismaModel>
    in?: $Enums.TipoUsuario[] | ListEnumTipoUsuarioFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoUsuario[] | ListEnumTipoUsuarioFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoUsuarioWithAggregatesFilter<$PrismaModel> | $Enums.TipoUsuario
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoUsuarioFilter<$PrismaModel>
    _max?: NestedEnumTipoUsuarioFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProfissionalCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    nome?: SortOrder
    especialidade?: SortOrder
    observacoes?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfissionalMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    nome?: SortOrder
    especialidade?: SortOrder
    observacoes?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfissionalMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    nome?: SortOrder
    especialidade?: SortOrder
    observacoes?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type ProfissionalNullableScalarRelationFilter = {
    is?: ProfissionalWhereInput | null
    isNot?: ProfissionalWhereInput | null
  }

  export type PacienteCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    profissionalId?: SortOrder
    nome?: SortOrder
    telefone?: SortOrder
    email?: SortOrder
    observacoes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PacienteMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    profissionalId?: SortOrder
    nome?: SortOrder
    telefone?: SortOrder
    email?: SortOrder
    observacoes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PacienteMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    profissionalId?: SortOrder
    nome?: SortOrder
    telefone?: SortOrder
    email?: SortOrder
    observacoes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
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

  export type ProcedimentoCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    nome?: SortOrder
    valor?: SortOrder
    duracaoMinutos?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProcedimentoAvgOrderByAggregateInput = {
    valor?: SortOrder
    duracaoMinutos?: SortOrder
  }

  export type ProcedimentoMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    nome?: SortOrder
    valor?: SortOrder
    duracaoMinutos?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProcedimentoMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    nome?: SortOrder
    valor?: SortOrder
    duracaoMinutos?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProcedimentoSumOrderByAggregateInput = {
    valor?: SortOrder
    duracaoMinutos?: SortOrder
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
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

  export type EnumStatusAgendamentoFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusAgendamento | EnumStatusAgendamentoFieldRefInput<$PrismaModel>
    in?: $Enums.StatusAgendamento[] | ListEnumStatusAgendamentoFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusAgendamento[] | ListEnumStatusAgendamentoFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusAgendamentoFilter<$PrismaModel> | $Enums.StatusAgendamento
  }

  export type PacienteNullableScalarRelationFilter = {
    is?: PacienteWhereInput | null
    isNot?: PacienteWhereInput | null
  }

  export type ProcedimentoScalarRelationFilter = {
    is?: ProcedimentoWhereInput
    isNot?: ProcedimentoWhereInput
  }

  export type ProfissionalScalarRelationFilter = {
    is?: ProfissionalWhereInput
    isNot?: ProfissionalWhereInput
  }

  export type AtendimentoNullableScalarRelationFilter = {
    is?: AtendimentoWhereInput | null
    isNot?: AtendimentoWhereInput | null
  }

  export type AgendamentoCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    pacienteId?: SortOrder
    profissionalId?: SortOrder
    procedimentoId?: SortOrder
    dataHora?: SortOrder
    status?: SortOrder
    observacoes?: SortOrder
    confirmacaoEnviada?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    dataHoraFim?: SortOrder
  }

  export type AgendamentoMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    pacienteId?: SortOrder
    profissionalId?: SortOrder
    procedimentoId?: SortOrder
    dataHora?: SortOrder
    status?: SortOrder
    observacoes?: SortOrder
    confirmacaoEnviada?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    dataHoraFim?: SortOrder
  }

  export type AgendamentoMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    pacienteId?: SortOrder
    profissionalId?: SortOrder
    procedimentoId?: SortOrder
    dataHora?: SortOrder
    status?: SortOrder
    observacoes?: SortOrder
    confirmacaoEnviada?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    dataHoraFim?: SortOrder
  }

  export type EnumStatusAgendamentoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusAgendamento | EnumStatusAgendamentoFieldRefInput<$PrismaModel>
    in?: $Enums.StatusAgendamento[] | ListEnumStatusAgendamentoFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusAgendamento[] | ListEnumStatusAgendamentoFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusAgendamentoWithAggregatesFilter<$PrismaModel> | $Enums.StatusAgendamento
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusAgendamentoFilter<$PrismaModel>
    _max?: NestedEnumStatusAgendamentoFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AgendamentoScalarRelationFilter = {
    is?: AgendamentoWhereInput
    isNot?: AgendamentoWhereInput
  }

  export type PacienteScalarRelationFilter = {
    is?: PacienteWhereInput
    isNot?: PacienteWhereInput
  }

  export type AtendimentoCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    agendamentoId?: SortOrder
    pacienteId?: SortOrder
    profissionalId?: SortOrder
    procedimentoId?: SortOrder
    anotacoes?: SortOrder
    procedimentosRealizados?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AtendimentoMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    agendamentoId?: SortOrder
    pacienteId?: SortOrder
    profissionalId?: SortOrder
    procedimentoId?: SortOrder
    anotacoes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AtendimentoMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    agendamentoId?: SortOrder
    pacienteId?: SortOrder
    profissionalId?: SortOrder
    procedimentoId?: SortOrder
    anotacoes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type WhatsAppConfigCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    templateConfirmacao?: SortOrder
    templateSim?: SortOrder
    templateNao?: SortOrder
    templateOpcoesInvalidas?: SortOrder
    horasAntecedencia?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WhatsAppConfigAvgOrderByAggregateInput = {
    horasAntecedencia?: SortOrder
  }

  export type WhatsAppConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    templateConfirmacao?: SortOrder
    templateSim?: SortOrder
    templateNao?: SortOrder
    templateOpcoesInvalidas?: SortOrder
    horasAntecedencia?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WhatsAppConfigMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    templateConfirmacao?: SortOrder
    templateSim?: SortOrder
    templateNao?: SortOrder
    templateOpcoesInvalidas?: SortOrder
    horasAntecedencia?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WhatsAppConfigSumOrderByAggregateInput = {
    horasAntecedencia?: SortOrder
  }

  export type EnumTipoLogFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoLog | EnumTipoLogFieldRefInput<$PrismaModel>
    in?: $Enums.TipoLog[] | ListEnumTipoLogFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoLog[] | ListEnumTipoLogFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoLogFilter<$PrismaModel> | $Enums.TipoLog
  }

  export type LogSistemaCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    usuarioId?: SortOrder
    tipo?: SortOrder
    descricao?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type LogSistemaMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    usuarioId?: SortOrder
    tipo?: SortOrder
    descricao?: SortOrder
    createdAt?: SortOrder
  }

  export type LogSistemaMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    usuarioId?: SortOrder
    tipo?: SortOrder
    descricao?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumTipoLogWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoLog | EnumTipoLogFieldRefInput<$PrismaModel>
    in?: $Enums.TipoLog[] | ListEnumTipoLogFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoLog[] | ListEnumTipoLogFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoLogWithAggregatesFilter<$PrismaModel> | $Enums.TipoLog
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoLogFilter<$PrismaModel>
    _max?: NestedEnumTipoLogFilter<$PrismaModel>
  }

  export type AgendamentoCreateNestedManyWithoutTenantInput = {
    create?: XOR<AgendamentoCreateWithoutTenantInput, AgendamentoUncheckedCreateWithoutTenantInput> | AgendamentoCreateWithoutTenantInput[] | AgendamentoUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: AgendamentoCreateOrConnectWithoutTenantInput | AgendamentoCreateOrConnectWithoutTenantInput[]
    createMany?: AgendamentoCreateManyTenantInputEnvelope
    connect?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
  }

  export type AtendimentoCreateNestedManyWithoutTenantInput = {
    create?: XOR<AtendimentoCreateWithoutTenantInput, AtendimentoUncheckedCreateWithoutTenantInput> | AtendimentoCreateWithoutTenantInput[] | AtendimentoUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: AtendimentoCreateOrConnectWithoutTenantInput | AtendimentoCreateOrConnectWithoutTenantInput[]
    createMany?: AtendimentoCreateManyTenantInputEnvelope
    connect?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
  }

  export type PacienteCreateNestedManyWithoutTenantInput = {
    create?: XOR<PacienteCreateWithoutTenantInput, PacienteUncheckedCreateWithoutTenantInput> | PacienteCreateWithoutTenantInput[] | PacienteUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: PacienteCreateOrConnectWithoutTenantInput | PacienteCreateOrConnectWithoutTenantInput[]
    createMany?: PacienteCreateManyTenantInputEnvelope
    connect?: PacienteWhereUniqueInput | PacienteWhereUniqueInput[]
  }

  export type ProcedimentoCreateNestedManyWithoutTenantInput = {
    create?: XOR<ProcedimentoCreateWithoutTenantInput, ProcedimentoUncheckedCreateWithoutTenantInput> | ProcedimentoCreateWithoutTenantInput[] | ProcedimentoUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ProcedimentoCreateOrConnectWithoutTenantInput | ProcedimentoCreateOrConnectWithoutTenantInput[]
    createMany?: ProcedimentoCreateManyTenantInputEnvelope
    connect?: ProcedimentoWhereUniqueInput | ProcedimentoWhereUniqueInput[]
  }

  export type ProfissionalCreateNestedManyWithoutTenantInput = {
    create?: XOR<ProfissionalCreateWithoutTenantInput, ProfissionalUncheckedCreateWithoutTenantInput> | ProfissionalCreateWithoutTenantInput[] | ProfissionalUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ProfissionalCreateOrConnectWithoutTenantInput | ProfissionalCreateOrConnectWithoutTenantInput[]
    createMany?: ProfissionalCreateManyTenantInputEnvelope
    connect?: ProfissionalWhereUniqueInput | ProfissionalWhereUniqueInput[]
  }

  export type UsuarioCreateNestedManyWithoutTenantInput = {
    create?: XOR<UsuarioCreateWithoutTenantInput, UsuarioUncheckedCreateWithoutTenantInput> | UsuarioCreateWithoutTenantInput[] | UsuarioUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutTenantInput | UsuarioCreateOrConnectWithoutTenantInput[]
    createMany?: UsuarioCreateManyTenantInputEnvelope
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
  }

  export type WhatsAppConfigCreateNestedOneWithoutTenantInput = {
    create?: XOR<WhatsAppConfigCreateWithoutTenantInput, WhatsAppConfigUncheckedCreateWithoutTenantInput>
    connectOrCreate?: WhatsAppConfigCreateOrConnectWithoutTenantInput
    connect?: WhatsAppConfigWhereUniqueInput
  }

  export type AgendamentoUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<AgendamentoCreateWithoutTenantInput, AgendamentoUncheckedCreateWithoutTenantInput> | AgendamentoCreateWithoutTenantInput[] | AgendamentoUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: AgendamentoCreateOrConnectWithoutTenantInput | AgendamentoCreateOrConnectWithoutTenantInput[]
    createMany?: AgendamentoCreateManyTenantInputEnvelope
    connect?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
  }

  export type AtendimentoUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<AtendimentoCreateWithoutTenantInput, AtendimentoUncheckedCreateWithoutTenantInput> | AtendimentoCreateWithoutTenantInput[] | AtendimentoUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: AtendimentoCreateOrConnectWithoutTenantInput | AtendimentoCreateOrConnectWithoutTenantInput[]
    createMany?: AtendimentoCreateManyTenantInputEnvelope
    connect?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
  }

  export type PacienteUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<PacienteCreateWithoutTenantInput, PacienteUncheckedCreateWithoutTenantInput> | PacienteCreateWithoutTenantInput[] | PacienteUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: PacienteCreateOrConnectWithoutTenantInput | PacienteCreateOrConnectWithoutTenantInput[]
    createMany?: PacienteCreateManyTenantInputEnvelope
    connect?: PacienteWhereUniqueInput | PacienteWhereUniqueInput[]
  }

  export type ProcedimentoUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<ProcedimentoCreateWithoutTenantInput, ProcedimentoUncheckedCreateWithoutTenantInput> | ProcedimentoCreateWithoutTenantInput[] | ProcedimentoUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ProcedimentoCreateOrConnectWithoutTenantInput | ProcedimentoCreateOrConnectWithoutTenantInput[]
    createMany?: ProcedimentoCreateManyTenantInputEnvelope
    connect?: ProcedimentoWhereUniqueInput | ProcedimentoWhereUniqueInput[]
  }

  export type ProfissionalUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<ProfissionalCreateWithoutTenantInput, ProfissionalUncheckedCreateWithoutTenantInput> | ProfissionalCreateWithoutTenantInput[] | ProfissionalUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ProfissionalCreateOrConnectWithoutTenantInput | ProfissionalCreateOrConnectWithoutTenantInput[]
    createMany?: ProfissionalCreateManyTenantInputEnvelope
    connect?: ProfissionalWhereUniqueInput | ProfissionalWhereUniqueInput[]
  }

  export type UsuarioUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<UsuarioCreateWithoutTenantInput, UsuarioUncheckedCreateWithoutTenantInput> | UsuarioCreateWithoutTenantInput[] | UsuarioUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutTenantInput | UsuarioCreateOrConnectWithoutTenantInput[]
    createMany?: UsuarioCreateManyTenantInputEnvelope
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
  }

  export type WhatsAppConfigUncheckedCreateNestedOneWithoutTenantInput = {
    create?: XOR<WhatsAppConfigCreateWithoutTenantInput, WhatsAppConfigUncheckedCreateWithoutTenantInput>
    connectOrCreate?: WhatsAppConfigCreateOrConnectWithoutTenantInput
    connect?: WhatsAppConfigWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AgendamentoUpdateManyWithoutTenantNestedInput = {
    create?: XOR<AgendamentoCreateWithoutTenantInput, AgendamentoUncheckedCreateWithoutTenantInput> | AgendamentoCreateWithoutTenantInput[] | AgendamentoUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: AgendamentoCreateOrConnectWithoutTenantInput | AgendamentoCreateOrConnectWithoutTenantInput[]
    upsert?: AgendamentoUpsertWithWhereUniqueWithoutTenantInput | AgendamentoUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: AgendamentoCreateManyTenantInputEnvelope
    set?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
    disconnect?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
    delete?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
    connect?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
    update?: AgendamentoUpdateWithWhereUniqueWithoutTenantInput | AgendamentoUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: AgendamentoUpdateManyWithWhereWithoutTenantInput | AgendamentoUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: AgendamentoScalarWhereInput | AgendamentoScalarWhereInput[]
  }

  export type AtendimentoUpdateManyWithoutTenantNestedInput = {
    create?: XOR<AtendimentoCreateWithoutTenantInput, AtendimentoUncheckedCreateWithoutTenantInput> | AtendimentoCreateWithoutTenantInput[] | AtendimentoUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: AtendimentoCreateOrConnectWithoutTenantInput | AtendimentoCreateOrConnectWithoutTenantInput[]
    upsert?: AtendimentoUpsertWithWhereUniqueWithoutTenantInput | AtendimentoUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: AtendimentoCreateManyTenantInputEnvelope
    set?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
    disconnect?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
    delete?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
    connect?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
    update?: AtendimentoUpdateWithWhereUniqueWithoutTenantInput | AtendimentoUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: AtendimentoUpdateManyWithWhereWithoutTenantInput | AtendimentoUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: AtendimentoScalarWhereInput | AtendimentoScalarWhereInput[]
  }

  export type PacienteUpdateManyWithoutTenantNestedInput = {
    create?: XOR<PacienteCreateWithoutTenantInput, PacienteUncheckedCreateWithoutTenantInput> | PacienteCreateWithoutTenantInput[] | PacienteUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: PacienteCreateOrConnectWithoutTenantInput | PacienteCreateOrConnectWithoutTenantInput[]
    upsert?: PacienteUpsertWithWhereUniqueWithoutTenantInput | PacienteUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: PacienteCreateManyTenantInputEnvelope
    set?: PacienteWhereUniqueInput | PacienteWhereUniqueInput[]
    disconnect?: PacienteWhereUniqueInput | PacienteWhereUniqueInput[]
    delete?: PacienteWhereUniqueInput | PacienteWhereUniqueInput[]
    connect?: PacienteWhereUniqueInput | PacienteWhereUniqueInput[]
    update?: PacienteUpdateWithWhereUniqueWithoutTenantInput | PacienteUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: PacienteUpdateManyWithWhereWithoutTenantInput | PacienteUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: PacienteScalarWhereInput | PacienteScalarWhereInput[]
  }

  export type ProcedimentoUpdateManyWithoutTenantNestedInput = {
    create?: XOR<ProcedimentoCreateWithoutTenantInput, ProcedimentoUncheckedCreateWithoutTenantInput> | ProcedimentoCreateWithoutTenantInput[] | ProcedimentoUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ProcedimentoCreateOrConnectWithoutTenantInput | ProcedimentoCreateOrConnectWithoutTenantInput[]
    upsert?: ProcedimentoUpsertWithWhereUniqueWithoutTenantInput | ProcedimentoUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: ProcedimentoCreateManyTenantInputEnvelope
    set?: ProcedimentoWhereUniqueInput | ProcedimentoWhereUniqueInput[]
    disconnect?: ProcedimentoWhereUniqueInput | ProcedimentoWhereUniqueInput[]
    delete?: ProcedimentoWhereUniqueInput | ProcedimentoWhereUniqueInput[]
    connect?: ProcedimentoWhereUniqueInput | ProcedimentoWhereUniqueInput[]
    update?: ProcedimentoUpdateWithWhereUniqueWithoutTenantInput | ProcedimentoUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: ProcedimentoUpdateManyWithWhereWithoutTenantInput | ProcedimentoUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: ProcedimentoScalarWhereInput | ProcedimentoScalarWhereInput[]
  }

  export type ProfissionalUpdateManyWithoutTenantNestedInput = {
    create?: XOR<ProfissionalCreateWithoutTenantInput, ProfissionalUncheckedCreateWithoutTenantInput> | ProfissionalCreateWithoutTenantInput[] | ProfissionalUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ProfissionalCreateOrConnectWithoutTenantInput | ProfissionalCreateOrConnectWithoutTenantInput[]
    upsert?: ProfissionalUpsertWithWhereUniqueWithoutTenantInput | ProfissionalUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: ProfissionalCreateManyTenantInputEnvelope
    set?: ProfissionalWhereUniqueInput | ProfissionalWhereUniqueInput[]
    disconnect?: ProfissionalWhereUniqueInput | ProfissionalWhereUniqueInput[]
    delete?: ProfissionalWhereUniqueInput | ProfissionalWhereUniqueInput[]
    connect?: ProfissionalWhereUniqueInput | ProfissionalWhereUniqueInput[]
    update?: ProfissionalUpdateWithWhereUniqueWithoutTenantInput | ProfissionalUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: ProfissionalUpdateManyWithWhereWithoutTenantInput | ProfissionalUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: ProfissionalScalarWhereInput | ProfissionalScalarWhereInput[]
  }

  export type UsuarioUpdateManyWithoutTenantNestedInput = {
    create?: XOR<UsuarioCreateWithoutTenantInput, UsuarioUncheckedCreateWithoutTenantInput> | UsuarioCreateWithoutTenantInput[] | UsuarioUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutTenantInput | UsuarioCreateOrConnectWithoutTenantInput[]
    upsert?: UsuarioUpsertWithWhereUniqueWithoutTenantInput | UsuarioUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: UsuarioCreateManyTenantInputEnvelope
    set?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    disconnect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    delete?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    update?: UsuarioUpdateWithWhereUniqueWithoutTenantInput | UsuarioUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: UsuarioUpdateManyWithWhereWithoutTenantInput | UsuarioUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
  }

  export type WhatsAppConfigUpdateOneWithoutTenantNestedInput = {
    create?: XOR<WhatsAppConfigCreateWithoutTenantInput, WhatsAppConfigUncheckedCreateWithoutTenantInput>
    connectOrCreate?: WhatsAppConfigCreateOrConnectWithoutTenantInput
    upsert?: WhatsAppConfigUpsertWithoutTenantInput
    disconnect?: WhatsAppConfigWhereInput | boolean
    delete?: WhatsAppConfigWhereInput | boolean
    connect?: WhatsAppConfigWhereUniqueInput
    update?: XOR<XOR<WhatsAppConfigUpdateToOneWithWhereWithoutTenantInput, WhatsAppConfigUpdateWithoutTenantInput>, WhatsAppConfigUncheckedUpdateWithoutTenantInput>
  }

  export type AgendamentoUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<AgendamentoCreateWithoutTenantInput, AgendamentoUncheckedCreateWithoutTenantInput> | AgendamentoCreateWithoutTenantInput[] | AgendamentoUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: AgendamentoCreateOrConnectWithoutTenantInput | AgendamentoCreateOrConnectWithoutTenantInput[]
    upsert?: AgendamentoUpsertWithWhereUniqueWithoutTenantInput | AgendamentoUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: AgendamentoCreateManyTenantInputEnvelope
    set?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
    disconnect?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
    delete?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
    connect?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
    update?: AgendamentoUpdateWithWhereUniqueWithoutTenantInput | AgendamentoUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: AgendamentoUpdateManyWithWhereWithoutTenantInput | AgendamentoUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: AgendamentoScalarWhereInput | AgendamentoScalarWhereInput[]
  }

  export type AtendimentoUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<AtendimentoCreateWithoutTenantInput, AtendimentoUncheckedCreateWithoutTenantInput> | AtendimentoCreateWithoutTenantInput[] | AtendimentoUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: AtendimentoCreateOrConnectWithoutTenantInput | AtendimentoCreateOrConnectWithoutTenantInput[]
    upsert?: AtendimentoUpsertWithWhereUniqueWithoutTenantInput | AtendimentoUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: AtendimentoCreateManyTenantInputEnvelope
    set?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
    disconnect?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
    delete?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
    connect?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
    update?: AtendimentoUpdateWithWhereUniqueWithoutTenantInput | AtendimentoUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: AtendimentoUpdateManyWithWhereWithoutTenantInput | AtendimentoUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: AtendimentoScalarWhereInput | AtendimentoScalarWhereInput[]
  }

  export type PacienteUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<PacienteCreateWithoutTenantInput, PacienteUncheckedCreateWithoutTenantInput> | PacienteCreateWithoutTenantInput[] | PacienteUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: PacienteCreateOrConnectWithoutTenantInput | PacienteCreateOrConnectWithoutTenantInput[]
    upsert?: PacienteUpsertWithWhereUniqueWithoutTenantInput | PacienteUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: PacienteCreateManyTenantInputEnvelope
    set?: PacienteWhereUniqueInput | PacienteWhereUniqueInput[]
    disconnect?: PacienteWhereUniqueInput | PacienteWhereUniqueInput[]
    delete?: PacienteWhereUniqueInput | PacienteWhereUniqueInput[]
    connect?: PacienteWhereUniqueInput | PacienteWhereUniqueInput[]
    update?: PacienteUpdateWithWhereUniqueWithoutTenantInput | PacienteUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: PacienteUpdateManyWithWhereWithoutTenantInput | PacienteUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: PacienteScalarWhereInput | PacienteScalarWhereInput[]
  }

  export type ProcedimentoUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<ProcedimentoCreateWithoutTenantInput, ProcedimentoUncheckedCreateWithoutTenantInput> | ProcedimentoCreateWithoutTenantInput[] | ProcedimentoUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ProcedimentoCreateOrConnectWithoutTenantInput | ProcedimentoCreateOrConnectWithoutTenantInput[]
    upsert?: ProcedimentoUpsertWithWhereUniqueWithoutTenantInput | ProcedimentoUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: ProcedimentoCreateManyTenantInputEnvelope
    set?: ProcedimentoWhereUniqueInput | ProcedimentoWhereUniqueInput[]
    disconnect?: ProcedimentoWhereUniqueInput | ProcedimentoWhereUniqueInput[]
    delete?: ProcedimentoWhereUniqueInput | ProcedimentoWhereUniqueInput[]
    connect?: ProcedimentoWhereUniqueInput | ProcedimentoWhereUniqueInput[]
    update?: ProcedimentoUpdateWithWhereUniqueWithoutTenantInput | ProcedimentoUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: ProcedimentoUpdateManyWithWhereWithoutTenantInput | ProcedimentoUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: ProcedimentoScalarWhereInput | ProcedimentoScalarWhereInput[]
  }

  export type ProfissionalUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<ProfissionalCreateWithoutTenantInput, ProfissionalUncheckedCreateWithoutTenantInput> | ProfissionalCreateWithoutTenantInput[] | ProfissionalUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ProfissionalCreateOrConnectWithoutTenantInput | ProfissionalCreateOrConnectWithoutTenantInput[]
    upsert?: ProfissionalUpsertWithWhereUniqueWithoutTenantInput | ProfissionalUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: ProfissionalCreateManyTenantInputEnvelope
    set?: ProfissionalWhereUniqueInput | ProfissionalWhereUniqueInput[]
    disconnect?: ProfissionalWhereUniqueInput | ProfissionalWhereUniqueInput[]
    delete?: ProfissionalWhereUniqueInput | ProfissionalWhereUniqueInput[]
    connect?: ProfissionalWhereUniqueInput | ProfissionalWhereUniqueInput[]
    update?: ProfissionalUpdateWithWhereUniqueWithoutTenantInput | ProfissionalUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: ProfissionalUpdateManyWithWhereWithoutTenantInput | ProfissionalUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: ProfissionalScalarWhereInput | ProfissionalScalarWhereInput[]
  }

  export type UsuarioUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<UsuarioCreateWithoutTenantInput, UsuarioUncheckedCreateWithoutTenantInput> | UsuarioCreateWithoutTenantInput[] | UsuarioUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutTenantInput | UsuarioCreateOrConnectWithoutTenantInput[]
    upsert?: UsuarioUpsertWithWhereUniqueWithoutTenantInput | UsuarioUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: UsuarioCreateManyTenantInputEnvelope
    set?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    disconnect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    delete?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    update?: UsuarioUpdateWithWhereUniqueWithoutTenantInput | UsuarioUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: UsuarioUpdateManyWithWhereWithoutTenantInput | UsuarioUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
  }

  export type WhatsAppConfigUncheckedUpdateOneWithoutTenantNestedInput = {
    create?: XOR<WhatsAppConfigCreateWithoutTenantInput, WhatsAppConfigUncheckedCreateWithoutTenantInput>
    connectOrCreate?: WhatsAppConfigCreateOrConnectWithoutTenantInput
    upsert?: WhatsAppConfigUpsertWithoutTenantInput
    disconnect?: WhatsAppConfigWhereInput | boolean
    delete?: WhatsAppConfigWhereInput | boolean
    connect?: WhatsAppConfigWhereUniqueInput
    update?: XOR<XOR<WhatsAppConfigUpdateToOneWithWhereWithoutTenantInput, WhatsAppConfigUpdateWithoutTenantInput>, WhatsAppConfigUncheckedUpdateWithoutTenantInput>
  }

  export type TenantCreateNestedOneWithoutUsuariosInput = {
    create?: XOR<TenantCreateWithoutUsuariosInput, TenantUncheckedCreateWithoutUsuariosInput>
    connectOrCreate?: TenantCreateOrConnectWithoutUsuariosInput
    connect?: TenantWhereUniqueInput
  }

  export type EnumTipoUsuarioFieldUpdateOperationsInput = {
    set?: $Enums.TipoUsuario
  }

  export type TenantUpdateOneRequiredWithoutUsuariosNestedInput = {
    create?: XOR<TenantCreateWithoutUsuariosInput, TenantUncheckedCreateWithoutUsuariosInput>
    connectOrCreate?: TenantCreateOrConnectWithoutUsuariosInput
    upsert?: TenantUpsertWithoutUsuariosInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutUsuariosInput, TenantUpdateWithoutUsuariosInput>, TenantUncheckedUpdateWithoutUsuariosInput>
  }

  export type AgendamentoCreateNestedManyWithoutProfissionalInput = {
    create?: XOR<AgendamentoCreateWithoutProfissionalInput, AgendamentoUncheckedCreateWithoutProfissionalInput> | AgendamentoCreateWithoutProfissionalInput[] | AgendamentoUncheckedCreateWithoutProfissionalInput[]
    connectOrCreate?: AgendamentoCreateOrConnectWithoutProfissionalInput | AgendamentoCreateOrConnectWithoutProfissionalInput[]
    createMany?: AgendamentoCreateManyProfissionalInputEnvelope
    connect?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
  }

  export type AtendimentoCreateNestedManyWithoutProfissionalInput = {
    create?: XOR<AtendimentoCreateWithoutProfissionalInput, AtendimentoUncheckedCreateWithoutProfissionalInput> | AtendimentoCreateWithoutProfissionalInput[] | AtendimentoUncheckedCreateWithoutProfissionalInput[]
    connectOrCreate?: AtendimentoCreateOrConnectWithoutProfissionalInput | AtendimentoCreateOrConnectWithoutProfissionalInput[]
    createMany?: AtendimentoCreateManyProfissionalInputEnvelope
    connect?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
  }

  export type PacienteCreateNestedManyWithoutProfissionalInput = {
    create?: XOR<PacienteCreateWithoutProfissionalInput, PacienteUncheckedCreateWithoutProfissionalInput> | PacienteCreateWithoutProfissionalInput[] | PacienteUncheckedCreateWithoutProfissionalInput[]
    connectOrCreate?: PacienteCreateOrConnectWithoutProfissionalInput | PacienteCreateOrConnectWithoutProfissionalInput[]
    createMany?: PacienteCreateManyProfissionalInputEnvelope
    connect?: PacienteWhereUniqueInput | PacienteWhereUniqueInput[]
  }

  export type TenantCreateNestedOneWithoutProfissionaisInput = {
    create?: XOR<TenantCreateWithoutProfissionaisInput, TenantUncheckedCreateWithoutProfissionaisInput>
    connectOrCreate?: TenantCreateOrConnectWithoutProfissionaisInput
    connect?: TenantWhereUniqueInput
  }

  export type AgendamentoUncheckedCreateNestedManyWithoutProfissionalInput = {
    create?: XOR<AgendamentoCreateWithoutProfissionalInput, AgendamentoUncheckedCreateWithoutProfissionalInput> | AgendamentoCreateWithoutProfissionalInput[] | AgendamentoUncheckedCreateWithoutProfissionalInput[]
    connectOrCreate?: AgendamentoCreateOrConnectWithoutProfissionalInput | AgendamentoCreateOrConnectWithoutProfissionalInput[]
    createMany?: AgendamentoCreateManyProfissionalInputEnvelope
    connect?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
  }

  export type AtendimentoUncheckedCreateNestedManyWithoutProfissionalInput = {
    create?: XOR<AtendimentoCreateWithoutProfissionalInput, AtendimentoUncheckedCreateWithoutProfissionalInput> | AtendimentoCreateWithoutProfissionalInput[] | AtendimentoUncheckedCreateWithoutProfissionalInput[]
    connectOrCreate?: AtendimentoCreateOrConnectWithoutProfissionalInput | AtendimentoCreateOrConnectWithoutProfissionalInput[]
    createMany?: AtendimentoCreateManyProfissionalInputEnvelope
    connect?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
  }

  export type PacienteUncheckedCreateNestedManyWithoutProfissionalInput = {
    create?: XOR<PacienteCreateWithoutProfissionalInput, PacienteUncheckedCreateWithoutProfissionalInput> | PacienteCreateWithoutProfissionalInput[] | PacienteUncheckedCreateWithoutProfissionalInput[]
    connectOrCreate?: PacienteCreateOrConnectWithoutProfissionalInput | PacienteCreateOrConnectWithoutProfissionalInput[]
    createMany?: PacienteCreateManyProfissionalInputEnvelope
    connect?: PacienteWhereUniqueInput | PacienteWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type AgendamentoUpdateManyWithoutProfissionalNestedInput = {
    create?: XOR<AgendamentoCreateWithoutProfissionalInput, AgendamentoUncheckedCreateWithoutProfissionalInput> | AgendamentoCreateWithoutProfissionalInput[] | AgendamentoUncheckedCreateWithoutProfissionalInput[]
    connectOrCreate?: AgendamentoCreateOrConnectWithoutProfissionalInput | AgendamentoCreateOrConnectWithoutProfissionalInput[]
    upsert?: AgendamentoUpsertWithWhereUniqueWithoutProfissionalInput | AgendamentoUpsertWithWhereUniqueWithoutProfissionalInput[]
    createMany?: AgendamentoCreateManyProfissionalInputEnvelope
    set?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
    disconnect?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
    delete?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
    connect?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
    update?: AgendamentoUpdateWithWhereUniqueWithoutProfissionalInput | AgendamentoUpdateWithWhereUniqueWithoutProfissionalInput[]
    updateMany?: AgendamentoUpdateManyWithWhereWithoutProfissionalInput | AgendamentoUpdateManyWithWhereWithoutProfissionalInput[]
    deleteMany?: AgendamentoScalarWhereInput | AgendamentoScalarWhereInput[]
  }

  export type AtendimentoUpdateManyWithoutProfissionalNestedInput = {
    create?: XOR<AtendimentoCreateWithoutProfissionalInput, AtendimentoUncheckedCreateWithoutProfissionalInput> | AtendimentoCreateWithoutProfissionalInput[] | AtendimentoUncheckedCreateWithoutProfissionalInput[]
    connectOrCreate?: AtendimentoCreateOrConnectWithoutProfissionalInput | AtendimentoCreateOrConnectWithoutProfissionalInput[]
    upsert?: AtendimentoUpsertWithWhereUniqueWithoutProfissionalInput | AtendimentoUpsertWithWhereUniqueWithoutProfissionalInput[]
    createMany?: AtendimentoCreateManyProfissionalInputEnvelope
    set?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
    disconnect?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
    delete?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
    connect?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
    update?: AtendimentoUpdateWithWhereUniqueWithoutProfissionalInput | AtendimentoUpdateWithWhereUniqueWithoutProfissionalInput[]
    updateMany?: AtendimentoUpdateManyWithWhereWithoutProfissionalInput | AtendimentoUpdateManyWithWhereWithoutProfissionalInput[]
    deleteMany?: AtendimentoScalarWhereInput | AtendimentoScalarWhereInput[]
  }

  export type PacienteUpdateManyWithoutProfissionalNestedInput = {
    create?: XOR<PacienteCreateWithoutProfissionalInput, PacienteUncheckedCreateWithoutProfissionalInput> | PacienteCreateWithoutProfissionalInput[] | PacienteUncheckedCreateWithoutProfissionalInput[]
    connectOrCreate?: PacienteCreateOrConnectWithoutProfissionalInput | PacienteCreateOrConnectWithoutProfissionalInput[]
    upsert?: PacienteUpsertWithWhereUniqueWithoutProfissionalInput | PacienteUpsertWithWhereUniqueWithoutProfissionalInput[]
    createMany?: PacienteCreateManyProfissionalInputEnvelope
    set?: PacienteWhereUniqueInput | PacienteWhereUniqueInput[]
    disconnect?: PacienteWhereUniqueInput | PacienteWhereUniqueInput[]
    delete?: PacienteWhereUniqueInput | PacienteWhereUniqueInput[]
    connect?: PacienteWhereUniqueInput | PacienteWhereUniqueInput[]
    update?: PacienteUpdateWithWhereUniqueWithoutProfissionalInput | PacienteUpdateWithWhereUniqueWithoutProfissionalInput[]
    updateMany?: PacienteUpdateManyWithWhereWithoutProfissionalInput | PacienteUpdateManyWithWhereWithoutProfissionalInput[]
    deleteMany?: PacienteScalarWhereInput | PacienteScalarWhereInput[]
  }

  export type TenantUpdateOneRequiredWithoutProfissionaisNestedInput = {
    create?: XOR<TenantCreateWithoutProfissionaisInput, TenantUncheckedCreateWithoutProfissionaisInput>
    connectOrCreate?: TenantCreateOrConnectWithoutProfissionaisInput
    upsert?: TenantUpsertWithoutProfissionaisInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutProfissionaisInput, TenantUpdateWithoutProfissionaisInput>, TenantUncheckedUpdateWithoutProfissionaisInput>
  }

  export type AgendamentoUncheckedUpdateManyWithoutProfissionalNestedInput = {
    create?: XOR<AgendamentoCreateWithoutProfissionalInput, AgendamentoUncheckedCreateWithoutProfissionalInput> | AgendamentoCreateWithoutProfissionalInput[] | AgendamentoUncheckedCreateWithoutProfissionalInput[]
    connectOrCreate?: AgendamentoCreateOrConnectWithoutProfissionalInput | AgendamentoCreateOrConnectWithoutProfissionalInput[]
    upsert?: AgendamentoUpsertWithWhereUniqueWithoutProfissionalInput | AgendamentoUpsertWithWhereUniqueWithoutProfissionalInput[]
    createMany?: AgendamentoCreateManyProfissionalInputEnvelope
    set?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
    disconnect?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
    delete?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
    connect?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
    update?: AgendamentoUpdateWithWhereUniqueWithoutProfissionalInput | AgendamentoUpdateWithWhereUniqueWithoutProfissionalInput[]
    updateMany?: AgendamentoUpdateManyWithWhereWithoutProfissionalInput | AgendamentoUpdateManyWithWhereWithoutProfissionalInput[]
    deleteMany?: AgendamentoScalarWhereInput | AgendamentoScalarWhereInput[]
  }

  export type AtendimentoUncheckedUpdateManyWithoutProfissionalNestedInput = {
    create?: XOR<AtendimentoCreateWithoutProfissionalInput, AtendimentoUncheckedCreateWithoutProfissionalInput> | AtendimentoCreateWithoutProfissionalInput[] | AtendimentoUncheckedCreateWithoutProfissionalInput[]
    connectOrCreate?: AtendimentoCreateOrConnectWithoutProfissionalInput | AtendimentoCreateOrConnectWithoutProfissionalInput[]
    upsert?: AtendimentoUpsertWithWhereUniqueWithoutProfissionalInput | AtendimentoUpsertWithWhereUniqueWithoutProfissionalInput[]
    createMany?: AtendimentoCreateManyProfissionalInputEnvelope
    set?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
    disconnect?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
    delete?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
    connect?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
    update?: AtendimentoUpdateWithWhereUniqueWithoutProfissionalInput | AtendimentoUpdateWithWhereUniqueWithoutProfissionalInput[]
    updateMany?: AtendimentoUpdateManyWithWhereWithoutProfissionalInput | AtendimentoUpdateManyWithWhereWithoutProfissionalInput[]
    deleteMany?: AtendimentoScalarWhereInput | AtendimentoScalarWhereInput[]
  }

  export type PacienteUncheckedUpdateManyWithoutProfissionalNestedInput = {
    create?: XOR<PacienteCreateWithoutProfissionalInput, PacienteUncheckedCreateWithoutProfissionalInput> | PacienteCreateWithoutProfissionalInput[] | PacienteUncheckedCreateWithoutProfissionalInput[]
    connectOrCreate?: PacienteCreateOrConnectWithoutProfissionalInput | PacienteCreateOrConnectWithoutProfissionalInput[]
    upsert?: PacienteUpsertWithWhereUniqueWithoutProfissionalInput | PacienteUpsertWithWhereUniqueWithoutProfissionalInput[]
    createMany?: PacienteCreateManyProfissionalInputEnvelope
    set?: PacienteWhereUniqueInput | PacienteWhereUniqueInput[]
    disconnect?: PacienteWhereUniqueInput | PacienteWhereUniqueInput[]
    delete?: PacienteWhereUniqueInput | PacienteWhereUniqueInput[]
    connect?: PacienteWhereUniqueInput | PacienteWhereUniqueInput[]
    update?: PacienteUpdateWithWhereUniqueWithoutProfissionalInput | PacienteUpdateWithWhereUniqueWithoutProfissionalInput[]
    updateMany?: PacienteUpdateManyWithWhereWithoutProfissionalInput | PacienteUpdateManyWithWhereWithoutProfissionalInput[]
    deleteMany?: PacienteScalarWhereInput | PacienteScalarWhereInput[]
  }

  export type AgendamentoCreateNestedManyWithoutPacienteInput = {
    create?: XOR<AgendamentoCreateWithoutPacienteInput, AgendamentoUncheckedCreateWithoutPacienteInput> | AgendamentoCreateWithoutPacienteInput[] | AgendamentoUncheckedCreateWithoutPacienteInput[]
    connectOrCreate?: AgendamentoCreateOrConnectWithoutPacienteInput | AgendamentoCreateOrConnectWithoutPacienteInput[]
    createMany?: AgendamentoCreateManyPacienteInputEnvelope
    connect?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
  }

  export type AtendimentoCreateNestedManyWithoutPacienteInput = {
    create?: XOR<AtendimentoCreateWithoutPacienteInput, AtendimentoUncheckedCreateWithoutPacienteInput> | AtendimentoCreateWithoutPacienteInput[] | AtendimentoUncheckedCreateWithoutPacienteInput[]
    connectOrCreate?: AtendimentoCreateOrConnectWithoutPacienteInput | AtendimentoCreateOrConnectWithoutPacienteInput[]
    createMany?: AtendimentoCreateManyPacienteInputEnvelope
    connect?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
  }

  export type ProfissionalCreateNestedOneWithoutPacientesInput = {
    create?: XOR<ProfissionalCreateWithoutPacientesInput, ProfissionalUncheckedCreateWithoutPacientesInput>
    connectOrCreate?: ProfissionalCreateOrConnectWithoutPacientesInput
    connect?: ProfissionalWhereUniqueInput
  }

  export type TenantCreateNestedOneWithoutPacientesInput = {
    create?: XOR<TenantCreateWithoutPacientesInput, TenantUncheckedCreateWithoutPacientesInput>
    connectOrCreate?: TenantCreateOrConnectWithoutPacientesInput
    connect?: TenantWhereUniqueInput
  }

  export type AgendamentoUncheckedCreateNestedManyWithoutPacienteInput = {
    create?: XOR<AgendamentoCreateWithoutPacienteInput, AgendamentoUncheckedCreateWithoutPacienteInput> | AgendamentoCreateWithoutPacienteInput[] | AgendamentoUncheckedCreateWithoutPacienteInput[]
    connectOrCreate?: AgendamentoCreateOrConnectWithoutPacienteInput | AgendamentoCreateOrConnectWithoutPacienteInput[]
    createMany?: AgendamentoCreateManyPacienteInputEnvelope
    connect?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
  }

  export type AtendimentoUncheckedCreateNestedManyWithoutPacienteInput = {
    create?: XOR<AtendimentoCreateWithoutPacienteInput, AtendimentoUncheckedCreateWithoutPacienteInput> | AtendimentoCreateWithoutPacienteInput[] | AtendimentoUncheckedCreateWithoutPacienteInput[]
    connectOrCreate?: AtendimentoCreateOrConnectWithoutPacienteInput | AtendimentoCreateOrConnectWithoutPacienteInput[]
    createMany?: AtendimentoCreateManyPacienteInputEnvelope
    connect?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
  }

  export type AgendamentoUpdateManyWithoutPacienteNestedInput = {
    create?: XOR<AgendamentoCreateWithoutPacienteInput, AgendamentoUncheckedCreateWithoutPacienteInput> | AgendamentoCreateWithoutPacienteInput[] | AgendamentoUncheckedCreateWithoutPacienteInput[]
    connectOrCreate?: AgendamentoCreateOrConnectWithoutPacienteInput | AgendamentoCreateOrConnectWithoutPacienteInput[]
    upsert?: AgendamentoUpsertWithWhereUniqueWithoutPacienteInput | AgendamentoUpsertWithWhereUniqueWithoutPacienteInput[]
    createMany?: AgendamentoCreateManyPacienteInputEnvelope
    set?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
    disconnect?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
    delete?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
    connect?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
    update?: AgendamentoUpdateWithWhereUniqueWithoutPacienteInput | AgendamentoUpdateWithWhereUniqueWithoutPacienteInput[]
    updateMany?: AgendamentoUpdateManyWithWhereWithoutPacienteInput | AgendamentoUpdateManyWithWhereWithoutPacienteInput[]
    deleteMany?: AgendamentoScalarWhereInput | AgendamentoScalarWhereInput[]
  }

  export type AtendimentoUpdateManyWithoutPacienteNestedInput = {
    create?: XOR<AtendimentoCreateWithoutPacienteInput, AtendimentoUncheckedCreateWithoutPacienteInput> | AtendimentoCreateWithoutPacienteInput[] | AtendimentoUncheckedCreateWithoutPacienteInput[]
    connectOrCreate?: AtendimentoCreateOrConnectWithoutPacienteInput | AtendimentoCreateOrConnectWithoutPacienteInput[]
    upsert?: AtendimentoUpsertWithWhereUniqueWithoutPacienteInput | AtendimentoUpsertWithWhereUniqueWithoutPacienteInput[]
    createMany?: AtendimentoCreateManyPacienteInputEnvelope
    set?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
    disconnect?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
    delete?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
    connect?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
    update?: AtendimentoUpdateWithWhereUniqueWithoutPacienteInput | AtendimentoUpdateWithWhereUniqueWithoutPacienteInput[]
    updateMany?: AtendimentoUpdateManyWithWhereWithoutPacienteInput | AtendimentoUpdateManyWithWhereWithoutPacienteInput[]
    deleteMany?: AtendimentoScalarWhereInput | AtendimentoScalarWhereInput[]
  }

  export type ProfissionalUpdateOneWithoutPacientesNestedInput = {
    create?: XOR<ProfissionalCreateWithoutPacientesInput, ProfissionalUncheckedCreateWithoutPacientesInput>
    connectOrCreate?: ProfissionalCreateOrConnectWithoutPacientesInput
    upsert?: ProfissionalUpsertWithoutPacientesInput
    disconnect?: ProfissionalWhereInput | boolean
    delete?: ProfissionalWhereInput | boolean
    connect?: ProfissionalWhereUniqueInput
    update?: XOR<XOR<ProfissionalUpdateToOneWithWhereWithoutPacientesInput, ProfissionalUpdateWithoutPacientesInput>, ProfissionalUncheckedUpdateWithoutPacientesInput>
  }

  export type TenantUpdateOneRequiredWithoutPacientesNestedInput = {
    create?: XOR<TenantCreateWithoutPacientesInput, TenantUncheckedCreateWithoutPacientesInput>
    connectOrCreate?: TenantCreateOrConnectWithoutPacientesInput
    upsert?: TenantUpsertWithoutPacientesInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutPacientesInput, TenantUpdateWithoutPacientesInput>, TenantUncheckedUpdateWithoutPacientesInput>
  }

  export type AgendamentoUncheckedUpdateManyWithoutPacienteNestedInput = {
    create?: XOR<AgendamentoCreateWithoutPacienteInput, AgendamentoUncheckedCreateWithoutPacienteInput> | AgendamentoCreateWithoutPacienteInput[] | AgendamentoUncheckedCreateWithoutPacienteInput[]
    connectOrCreate?: AgendamentoCreateOrConnectWithoutPacienteInput | AgendamentoCreateOrConnectWithoutPacienteInput[]
    upsert?: AgendamentoUpsertWithWhereUniqueWithoutPacienteInput | AgendamentoUpsertWithWhereUniqueWithoutPacienteInput[]
    createMany?: AgendamentoCreateManyPacienteInputEnvelope
    set?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
    disconnect?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
    delete?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
    connect?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
    update?: AgendamentoUpdateWithWhereUniqueWithoutPacienteInput | AgendamentoUpdateWithWhereUniqueWithoutPacienteInput[]
    updateMany?: AgendamentoUpdateManyWithWhereWithoutPacienteInput | AgendamentoUpdateManyWithWhereWithoutPacienteInput[]
    deleteMany?: AgendamentoScalarWhereInput | AgendamentoScalarWhereInput[]
  }

  export type AtendimentoUncheckedUpdateManyWithoutPacienteNestedInput = {
    create?: XOR<AtendimentoCreateWithoutPacienteInput, AtendimentoUncheckedCreateWithoutPacienteInput> | AtendimentoCreateWithoutPacienteInput[] | AtendimentoUncheckedCreateWithoutPacienteInput[]
    connectOrCreate?: AtendimentoCreateOrConnectWithoutPacienteInput | AtendimentoCreateOrConnectWithoutPacienteInput[]
    upsert?: AtendimentoUpsertWithWhereUniqueWithoutPacienteInput | AtendimentoUpsertWithWhereUniqueWithoutPacienteInput[]
    createMany?: AtendimentoCreateManyPacienteInputEnvelope
    set?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
    disconnect?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
    delete?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
    connect?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
    update?: AtendimentoUpdateWithWhereUniqueWithoutPacienteInput | AtendimentoUpdateWithWhereUniqueWithoutPacienteInput[]
    updateMany?: AtendimentoUpdateManyWithWhereWithoutPacienteInput | AtendimentoUpdateManyWithWhereWithoutPacienteInput[]
    deleteMany?: AtendimentoScalarWhereInput | AtendimentoScalarWhereInput[]
  }

  export type AgendamentoCreateNestedManyWithoutProcedimentoInput = {
    create?: XOR<AgendamentoCreateWithoutProcedimentoInput, AgendamentoUncheckedCreateWithoutProcedimentoInput> | AgendamentoCreateWithoutProcedimentoInput[] | AgendamentoUncheckedCreateWithoutProcedimentoInput[]
    connectOrCreate?: AgendamentoCreateOrConnectWithoutProcedimentoInput | AgendamentoCreateOrConnectWithoutProcedimentoInput[]
    createMany?: AgendamentoCreateManyProcedimentoInputEnvelope
    connect?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
  }

  export type AtendimentoCreateNestedManyWithoutProcedimentoInput = {
    create?: XOR<AtendimentoCreateWithoutProcedimentoInput, AtendimentoUncheckedCreateWithoutProcedimentoInput> | AtendimentoCreateWithoutProcedimentoInput[] | AtendimentoUncheckedCreateWithoutProcedimentoInput[]
    connectOrCreate?: AtendimentoCreateOrConnectWithoutProcedimentoInput | AtendimentoCreateOrConnectWithoutProcedimentoInput[]
    createMany?: AtendimentoCreateManyProcedimentoInputEnvelope
    connect?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
  }

  export type TenantCreateNestedOneWithoutProcedimentosInput = {
    create?: XOR<TenantCreateWithoutProcedimentosInput, TenantUncheckedCreateWithoutProcedimentosInput>
    connectOrCreate?: TenantCreateOrConnectWithoutProcedimentosInput
    connect?: TenantWhereUniqueInput
  }

  export type AgendamentoUncheckedCreateNestedManyWithoutProcedimentoInput = {
    create?: XOR<AgendamentoCreateWithoutProcedimentoInput, AgendamentoUncheckedCreateWithoutProcedimentoInput> | AgendamentoCreateWithoutProcedimentoInput[] | AgendamentoUncheckedCreateWithoutProcedimentoInput[]
    connectOrCreate?: AgendamentoCreateOrConnectWithoutProcedimentoInput | AgendamentoCreateOrConnectWithoutProcedimentoInput[]
    createMany?: AgendamentoCreateManyProcedimentoInputEnvelope
    connect?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
  }

  export type AtendimentoUncheckedCreateNestedManyWithoutProcedimentoInput = {
    create?: XOR<AtendimentoCreateWithoutProcedimentoInput, AtendimentoUncheckedCreateWithoutProcedimentoInput> | AtendimentoCreateWithoutProcedimentoInput[] | AtendimentoUncheckedCreateWithoutProcedimentoInput[]
    connectOrCreate?: AtendimentoCreateOrConnectWithoutProcedimentoInput | AtendimentoCreateOrConnectWithoutProcedimentoInput[]
    createMany?: AtendimentoCreateManyProcedimentoInputEnvelope
    connect?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AgendamentoUpdateManyWithoutProcedimentoNestedInput = {
    create?: XOR<AgendamentoCreateWithoutProcedimentoInput, AgendamentoUncheckedCreateWithoutProcedimentoInput> | AgendamentoCreateWithoutProcedimentoInput[] | AgendamentoUncheckedCreateWithoutProcedimentoInput[]
    connectOrCreate?: AgendamentoCreateOrConnectWithoutProcedimentoInput | AgendamentoCreateOrConnectWithoutProcedimentoInput[]
    upsert?: AgendamentoUpsertWithWhereUniqueWithoutProcedimentoInput | AgendamentoUpsertWithWhereUniqueWithoutProcedimentoInput[]
    createMany?: AgendamentoCreateManyProcedimentoInputEnvelope
    set?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
    disconnect?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
    delete?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
    connect?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
    update?: AgendamentoUpdateWithWhereUniqueWithoutProcedimentoInput | AgendamentoUpdateWithWhereUniqueWithoutProcedimentoInput[]
    updateMany?: AgendamentoUpdateManyWithWhereWithoutProcedimentoInput | AgendamentoUpdateManyWithWhereWithoutProcedimentoInput[]
    deleteMany?: AgendamentoScalarWhereInput | AgendamentoScalarWhereInput[]
  }

  export type AtendimentoUpdateManyWithoutProcedimentoNestedInput = {
    create?: XOR<AtendimentoCreateWithoutProcedimentoInput, AtendimentoUncheckedCreateWithoutProcedimentoInput> | AtendimentoCreateWithoutProcedimentoInput[] | AtendimentoUncheckedCreateWithoutProcedimentoInput[]
    connectOrCreate?: AtendimentoCreateOrConnectWithoutProcedimentoInput | AtendimentoCreateOrConnectWithoutProcedimentoInput[]
    upsert?: AtendimentoUpsertWithWhereUniqueWithoutProcedimentoInput | AtendimentoUpsertWithWhereUniqueWithoutProcedimentoInput[]
    createMany?: AtendimentoCreateManyProcedimentoInputEnvelope
    set?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
    disconnect?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
    delete?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
    connect?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
    update?: AtendimentoUpdateWithWhereUniqueWithoutProcedimentoInput | AtendimentoUpdateWithWhereUniqueWithoutProcedimentoInput[]
    updateMany?: AtendimentoUpdateManyWithWhereWithoutProcedimentoInput | AtendimentoUpdateManyWithWhereWithoutProcedimentoInput[]
    deleteMany?: AtendimentoScalarWhereInput | AtendimentoScalarWhereInput[]
  }

  export type TenantUpdateOneRequiredWithoutProcedimentosNestedInput = {
    create?: XOR<TenantCreateWithoutProcedimentosInput, TenantUncheckedCreateWithoutProcedimentosInput>
    connectOrCreate?: TenantCreateOrConnectWithoutProcedimentosInput
    upsert?: TenantUpsertWithoutProcedimentosInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutProcedimentosInput, TenantUpdateWithoutProcedimentosInput>, TenantUncheckedUpdateWithoutProcedimentosInput>
  }

  export type AgendamentoUncheckedUpdateManyWithoutProcedimentoNestedInput = {
    create?: XOR<AgendamentoCreateWithoutProcedimentoInput, AgendamentoUncheckedCreateWithoutProcedimentoInput> | AgendamentoCreateWithoutProcedimentoInput[] | AgendamentoUncheckedCreateWithoutProcedimentoInput[]
    connectOrCreate?: AgendamentoCreateOrConnectWithoutProcedimentoInput | AgendamentoCreateOrConnectWithoutProcedimentoInput[]
    upsert?: AgendamentoUpsertWithWhereUniqueWithoutProcedimentoInput | AgendamentoUpsertWithWhereUniqueWithoutProcedimentoInput[]
    createMany?: AgendamentoCreateManyProcedimentoInputEnvelope
    set?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
    disconnect?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
    delete?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
    connect?: AgendamentoWhereUniqueInput | AgendamentoWhereUniqueInput[]
    update?: AgendamentoUpdateWithWhereUniqueWithoutProcedimentoInput | AgendamentoUpdateWithWhereUniqueWithoutProcedimentoInput[]
    updateMany?: AgendamentoUpdateManyWithWhereWithoutProcedimentoInput | AgendamentoUpdateManyWithWhereWithoutProcedimentoInput[]
    deleteMany?: AgendamentoScalarWhereInput | AgendamentoScalarWhereInput[]
  }

  export type AtendimentoUncheckedUpdateManyWithoutProcedimentoNestedInput = {
    create?: XOR<AtendimentoCreateWithoutProcedimentoInput, AtendimentoUncheckedCreateWithoutProcedimentoInput> | AtendimentoCreateWithoutProcedimentoInput[] | AtendimentoUncheckedCreateWithoutProcedimentoInput[]
    connectOrCreate?: AtendimentoCreateOrConnectWithoutProcedimentoInput | AtendimentoCreateOrConnectWithoutProcedimentoInput[]
    upsert?: AtendimentoUpsertWithWhereUniqueWithoutProcedimentoInput | AtendimentoUpsertWithWhereUniqueWithoutProcedimentoInput[]
    createMany?: AtendimentoCreateManyProcedimentoInputEnvelope
    set?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
    disconnect?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
    delete?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
    connect?: AtendimentoWhereUniqueInput | AtendimentoWhereUniqueInput[]
    update?: AtendimentoUpdateWithWhereUniqueWithoutProcedimentoInput | AtendimentoUpdateWithWhereUniqueWithoutProcedimentoInput[]
    updateMany?: AtendimentoUpdateManyWithWhereWithoutProcedimentoInput | AtendimentoUpdateManyWithWhereWithoutProcedimentoInput[]
    deleteMany?: AtendimentoScalarWhereInput | AtendimentoScalarWhereInput[]
  }

  export type PacienteCreateNestedOneWithoutAgendamentosInput = {
    create?: XOR<PacienteCreateWithoutAgendamentosInput, PacienteUncheckedCreateWithoutAgendamentosInput>
    connectOrCreate?: PacienteCreateOrConnectWithoutAgendamentosInput
    connect?: PacienteWhereUniqueInput
  }

  export type ProcedimentoCreateNestedOneWithoutAgendamentosInput = {
    create?: XOR<ProcedimentoCreateWithoutAgendamentosInput, ProcedimentoUncheckedCreateWithoutAgendamentosInput>
    connectOrCreate?: ProcedimentoCreateOrConnectWithoutAgendamentosInput
    connect?: ProcedimentoWhereUniqueInput
  }

  export type ProfissionalCreateNestedOneWithoutAgendamentosInput = {
    create?: XOR<ProfissionalCreateWithoutAgendamentosInput, ProfissionalUncheckedCreateWithoutAgendamentosInput>
    connectOrCreate?: ProfissionalCreateOrConnectWithoutAgendamentosInput
    connect?: ProfissionalWhereUniqueInput
  }

  export type TenantCreateNestedOneWithoutAgendamentosInput = {
    create?: XOR<TenantCreateWithoutAgendamentosInput, TenantUncheckedCreateWithoutAgendamentosInput>
    connectOrCreate?: TenantCreateOrConnectWithoutAgendamentosInput
    connect?: TenantWhereUniqueInput
  }

  export type AtendimentoCreateNestedOneWithoutAgendamentoInput = {
    create?: XOR<AtendimentoCreateWithoutAgendamentoInput, AtendimentoUncheckedCreateWithoutAgendamentoInput>
    connectOrCreate?: AtendimentoCreateOrConnectWithoutAgendamentoInput
    connect?: AtendimentoWhereUniqueInput
  }

  export type AtendimentoUncheckedCreateNestedOneWithoutAgendamentoInput = {
    create?: XOR<AtendimentoCreateWithoutAgendamentoInput, AtendimentoUncheckedCreateWithoutAgendamentoInput>
    connectOrCreate?: AtendimentoCreateOrConnectWithoutAgendamentoInput
    connect?: AtendimentoWhereUniqueInput
  }

  export type EnumStatusAgendamentoFieldUpdateOperationsInput = {
    set?: $Enums.StatusAgendamento
  }

  export type PacienteUpdateOneWithoutAgendamentosNestedInput = {
    create?: XOR<PacienteCreateWithoutAgendamentosInput, PacienteUncheckedCreateWithoutAgendamentosInput>
    connectOrCreate?: PacienteCreateOrConnectWithoutAgendamentosInput
    upsert?: PacienteUpsertWithoutAgendamentosInput
    disconnect?: PacienteWhereInput | boolean
    delete?: PacienteWhereInput | boolean
    connect?: PacienteWhereUniqueInput
    update?: XOR<XOR<PacienteUpdateToOneWithWhereWithoutAgendamentosInput, PacienteUpdateWithoutAgendamentosInput>, PacienteUncheckedUpdateWithoutAgendamentosInput>
  }

  export type ProcedimentoUpdateOneRequiredWithoutAgendamentosNestedInput = {
    create?: XOR<ProcedimentoCreateWithoutAgendamentosInput, ProcedimentoUncheckedCreateWithoutAgendamentosInput>
    connectOrCreate?: ProcedimentoCreateOrConnectWithoutAgendamentosInput
    upsert?: ProcedimentoUpsertWithoutAgendamentosInput
    connect?: ProcedimentoWhereUniqueInput
    update?: XOR<XOR<ProcedimentoUpdateToOneWithWhereWithoutAgendamentosInput, ProcedimentoUpdateWithoutAgendamentosInput>, ProcedimentoUncheckedUpdateWithoutAgendamentosInput>
  }

  export type ProfissionalUpdateOneRequiredWithoutAgendamentosNestedInput = {
    create?: XOR<ProfissionalCreateWithoutAgendamentosInput, ProfissionalUncheckedCreateWithoutAgendamentosInput>
    connectOrCreate?: ProfissionalCreateOrConnectWithoutAgendamentosInput
    upsert?: ProfissionalUpsertWithoutAgendamentosInput
    connect?: ProfissionalWhereUniqueInput
    update?: XOR<XOR<ProfissionalUpdateToOneWithWhereWithoutAgendamentosInput, ProfissionalUpdateWithoutAgendamentosInput>, ProfissionalUncheckedUpdateWithoutAgendamentosInput>
  }

  export type TenantUpdateOneRequiredWithoutAgendamentosNestedInput = {
    create?: XOR<TenantCreateWithoutAgendamentosInput, TenantUncheckedCreateWithoutAgendamentosInput>
    connectOrCreate?: TenantCreateOrConnectWithoutAgendamentosInput
    upsert?: TenantUpsertWithoutAgendamentosInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutAgendamentosInput, TenantUpdateWithoutAgendamentosInput>, TenantUncheckedUpdateWithoutAgendamentosInput>
  }

  export type AtendimentoUpdateOneWithoutAgendamentoNestedInput = {
    create?: XOR<AtendimentoCreateWithoutAgendamentoInput, AtendimentoUncheckedCreateWithoutAgendamentoInput>
    connectOrCreate?: AtendimentoCreateOrConnectWithoutAgendamentoInput
    upsert?: AtendimentoUpsertWithoutAgendamentoInput
    disconnect?: AtendimentoWhereInput | boolean
    delete?: AtendimentoWhereInput | boolean
    connect?: AtendimentoWhereUniqueInput
    update?: XOR<XOR<AtendimentoUpdateToOneWithWhereWithoutAgendamentoInput, AtendimentoUpdateWithoutAgendamentoInput>, AtendimentoUncheckedUpdateWithoutAgendamentoInput>
  }

  export type AtendimentoUncheckedUpdateOneWithoutAgendamentoNestedInput = {
    create?: XOR<AtendimentoCreateWithoutAgendamentoInput, AtendimentoUncheckedCreateWithoutAgendamentoInput>
    connectOrCreate?: AtendimentoCreateOrConnectWithoutAgendamentoInput
    upsert?: AtendimentoUpsertWithoutAgendamentoInput
    disconnect?: AtendimentoWhereInput | boolean
    delete?: AtendimentoWhereInput | boolean
    connect?: AtendimentoWhereUniqueInput
    update?: XOR<XOR<AtendimentoUpdateToOneWithWhereWithoutAgendamentoInput, AtendimentoUpdateWithoutAgendamentoInput>, AtendimentoUncheckedUpdateWithoutAgendamentoInput>
  }

  export type AgendamentoCreateNestedOneWithoutAtendimentoInput = {
    create?: XOR<AgendamentoCreateWithoutAtendimentoInput, AgendamentoUncheckedCreateWithoutAtendimentoInput>
    connectOrCreate?: AgendamentoCreateOrConnectWithoutAtendimentoInput
    connect?: AgendamentoWhereUniqueInput
  }

  export type PacienteCreateNestedOneWithoutAtendimentosInput = {
    create?: XOR<PacienteCreateWithoutAtendimentosInput, PacienteUncheckedCreateWithoutAtendimentosInput>
    connectOrCreate?: PacienteCreateOrConnectWithoutAtendimentosInput
    connect?: PacienteWhereUniqueInput
  }

  export type ProcedimentoCreateNestedOneWithoutAtendimentosInput = {
    create?: XOR<ProcedimentoCreateWithoutAtendimentosInput, ProcedimentoUncheckedCreateWithoutAtendimentosInput>
    connectOrCreate?: ProcedimentoCreateOrConnectWithoutAtendimentosInput
    connect?: ProcedimentoWhereUniqueInput
  }

  export type ProfissionalCreateNestedOneWithoutAtendimentosInput = {
    create?: XOR<ProfissionalCreateWithoutAtendimentosInput, ProfissionalUncheckedCreateWithoutAtendimentosInput>
    connectOrCreate?: ProfissionalCreateOrConnectWithoutAtendimentosInput
    connect?: ProfissionalWhereUniqueInput
  }

  export type TenantCreateNestedOneWithoutAtendimentosInput = {
    create?: XOR<TenantCreateWithoutAtendimentosInput, TenantUncheckedCreateWithoutAtendimentosInput>
    connectOrCreate?: TenantCreateOrConnectWithoutAtendimentosInput
    connect?: TenantWhereUniqueInput
  }

  export type AgendamentoUpdateOneRequiredWithoutAtendimentoNestedInput = {
    create?: XOR<AgendamentoCreateWithoutAtendimentoInput, AgendamentoUncheckedCreateWithoutAtendimentoInput>
    connectOrCreate?: AgendamentoCreateOrConnectWithoutAtendimentoInput
    upsert?: AgendamentoUpsertWithoutAtendimentoInput
    connect?: AgendamentoWhereUniqueInput
    update?: XOR<XOR<AgendamentoUpdateToOneWithWhereWithoutAtendimentoInput, AgendamentoUpdateWithoutAtendimentoInput>, AgendamentoUncheckedUpdateWithoutAtendimentoInput>
  }

  export type PacienteUpdateOneRequiredWithoutAtendimentosNestedInput = {
    create?: XOR<PacienteCreateWithoutAtendimentosInput, PacienteUncheckedCreateWithoutAtendimentosInput>
    connectOrCreate?: PacienteCreateOrConnectWithoutAtendimentosInput
    upsert?: PacienteUpsertWithoutAtendimentosInput
    connect?: PacienteWhereUniqueInput
    update?: XOR<XOR<PacienteUpdateToOneWithWhereWithoutAtendimentosInput, PacienteUpdateWithoutAtendimentosInput>, PacienteUncheckedUpdateWithoutAtendimentosInput>
  }

  export type ProcedimentoUpdateOneRequiredWithoutAtendimentosNestedInput = {
    create?: XOR<ProcedimentoCreateWithoutAtendimentosInput, ProcedimentoUncheckedCreateWithoutAtendimentosInput>
    connectOrCreate?: ProcedimentoCreateOrConnectWithoutAtendimentosInput
    upsert?: ProcedimentoUpsertWithoutAtendimentosInput
    connect?: ProcedimentoWhereUniqueInput
    update?: XOR<XOR<ProcedimentoUpdateToOneWithWhereWithoutAtendimentosInput, ProcedimentoUpdateWithoutAtendimentosInput>, ProcedimentoUncheckedUpdateWithoutAtendimentosInput>
  }

  export type ProfissionalUpdateOneRequiredWithoutAtendimentosNestedInput = {
    create?: XOR<ProfissionalCreateWithoutAtendimentosInput, ProfissionalUncheckedCreateWithoutAtendimentosInput>
    connectOrCreate?: ProfissionalCreateOrConnectWithoutAtendimentosInput
    upsert?: ProfissionalUpsertWithoutAtendimentosInput
    connect?: ProfissionalWhereUniqueInput
    update?: XOR<XOR<ProfissionalUpdateToOneWithWhereWithoutAtendimentosInput, ProfissionalUpdateWithoutAtendimentosInput>, ProfissionalUncheckedUpdateWithoutAtendimentosInput>
  }

  export type TenantUpdateOneRequiredWithoutAtendimentosNestedInput = {
    create?: XOR<TenantCreateWithoutAtendimentosInput, TenantUncheckedCreateWithoutAtendimentosInput>
    connectOrCreate?: TenantCreateOrConnectWithoutAtendimentosInput
    upsert?: TenantUpsertWithoutAtendimentosInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutAtendimentosInput, TenantUpdateWithoutAtendimentosInput>, TenantUncheckedUpdateWithoutAtendimentosInput>
  }

  export type TenantCreateNestedOneWithoutWhatsappConfigInput = {
    create?: XOR<TenantCreateWithoutWhatsappConfigInput, TenantUncheckedCreateWithoutWhatsappConfigInput>
    connectOrCreate?: TenantCreateOrConnectWithoutWhatsappConfigInput
    connect?: TenantWhereUniqueInput
  }

  export type TenantUpdateOneRequiredWithoutWhatsappConfigNestedInput = {
    create?: XOR<TenantCreateWithoutWhatsappConfigInput, TenantUncheckedCreateWithoutWhatsappConfigInput>
    connectOrCreate?: TenantCreateOrConnectWithoutWhatsappConfigInput
    upsert?: TenantUpsertWithoutWhatsappConfigInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutWhatsappConfigInput, TenantUpdateWithoutWhatsappConfigInput>, TenantUncheckedUpdateWithoutWhatsappConfigInput>
  }

  export type EnumTipoLogFieldUpdateOperationsInput = {
    set?: $Enums.TipoLog
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedEnumTipoUsuarioFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoUsuario | EnumTipoUsuarioFieldRefInput<$PrismaModel>
    in?: $Enums.TipoUsuario[] | ListEnumTipoUsuarioFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoUsuario[] | ListEnumTipoUsuarioFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoUsuarioFilter<$PrismaModel> | $Enums.TipoUsuario
  }

  export type NestedEnumTipoUsuarioWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoUsuario | EnumTipoUsuarioFieldRefInput<$PrismaModel>
    in?: $Enums.TipoUsuario[] | ListEnumTipoUsuarioFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoUsuario[] | ListEnumTipoUsuarioFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoUsuarioWithAggregatesFilter<$PrismaModel> | $Enums.TipoUsuario
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoUsuarioFilter<$PrismaModel>
    _max?: NestedEnumTipoUsuarioFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
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

  export type NestedEnumStatusAgendamentoFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusAgendamento | EnumStatusAgendamentoFieldRefInput<$PrismaModel>
    in?: $Enums.StatusAgendamento[] | ListEnumStatusAgendamentoFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusAgendamento[] | ListEnumStatusAgendamentoFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusAgendamentoFilter<$PrismaModel> | $Enums.StatusAgendamento
  }

  export type NestedEnumStatusAgendamentoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusAgendamento | EnumStatusAgendamentoFieldRefInput<$PrismaModel>
    in?: $Enums.StatusAgendamento[] | ListEnumStatusAgendamentoFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusAgendamento[] | ListEnumStatusAgendamentoFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusAgendamentoWithAggregatesFilter<$PrismaModel> | $Enums.StatusAgendamento
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusAgendamentoFilter<$PrismaModel>
    _max?: NestedEnumStatusAgendamentoFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumTipoLogFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoLog | EnumTipoLogFieldRefInput<$PrismaModel>
    in?: $Enums.TipoLog[] | ListEnumTipoLogFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoLog[] | ListEnumTipoLogFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoLogFilter<$PrismaModel> | $Enums.TipoLog
  }

  export type NestedEnumTipoLogWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoLog | EnumTipoLogFieldRefInput<$PrismaModel>
    in?: $Enums.TipoLog[] | ListEnumTipoLogFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoLog[] | ListEnumTipoLogFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoLogWithAggregatesFilter<$PrismaModel> | $Enums.TipoLog
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoLogFilter<$PrismaModel>
    _max?: NestedEnumTipoLogFilter<$PrismaModel>
  }

  export type AgendamentoCreateWithoutTenantInput = {
    id?: string
    dataHora: Date | string
    status?: $Enums.StatusAgendamento
    observacoes?: string | null
    confirmacaoEnviada?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dataHoraFim: Date | string
    paciente?: PacienteCreateNestedOneWithoutAgendamentosInput
    procedimento: ProcedimentoCreateNestedOneWithoutAgendamentosInput
    profissional: ProfissionalCreateNestedOneWithoutAgendamentosInput
    atendimento?: AtendimentoCreateNestedOneWithoutAgendamentoInput
  }

  export type AgendamentoUncheckedCreateWithoutTenantInput = {
    id?: string
    pacienteId?: string | null
    profissionalId: string
    procedimentoId: string
    dataHora: Date | string
    status?: $Enums.StatusAgendamento
    observacoes?: string | null
    confirmacaoEnviada?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dataHoraFim: Date | string
    atendimento?: AtendimentoUncheckedCreateNestedOneWithoutAgendamentoInput
  }

  export type AgendamentoCreateOrConnectWithoutTenantInput = {
    where: AgendamentoWhereUniqueInput
    create: XOR<AgendamentoCreateWithoutTenantInput, AgendamentoUncheckedCreateWithoutTenantInput>
  }

  export type AgendamentoCreateManyTenantInputEnvelope = {
    data: AgendamentoCreateManyTenantInput | AgendamentoCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type AtendimentoCreateWithoutTenantInput = {
    id?: string
    anotacoes?: string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamento: AgendamentoCreateNestedOneWithoutAtendimentoInput
    paciente: PacienteCreateNestedOneWithoutAtendimentosInput
    procedimento: ProcedimentoCreateNestedOneWithoutAtendimentosInput
    profissional: ProfissionalCreateNestedOneWithoutAtendimentosInput
  }

  export type AtendimentoUncheckedCreateWithoutTenantInput = {
    id?: string
    agendamentoId: string
    pacienteId: string
    profissionalId: string
    procedimentoId: string
    anotacoes?: string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AtendimentoCreateOrConnectWithoutTenantInput = {
    where: AtendimentoWhereUniqueInput
    create: XOR<AtendimentoCreateWithoutTenantInput, AtendimentoUncheckedCreateWithoutTenantInput>
  }

  export type AtendimentoCreateManyTenantInputEnvelope = {
    data: AtendimentoCreateManyTenantInput | AtendimentoCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type PacienteCreateWithoutTenantInput = {
    id?: string
    nome: string
    telefone: string
    email?: string | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoCreateNestedManyWithoutPacienteInput
    atendimentos?: AtendimentoCreateNestedManyWithoutPacienteInput
    profissional?: ProfissionalCreateNestedOneWithoutPacientesInput
  }

  export type PacienteUncheckedCreateWithoutTenantInput = {
    id?: string
    profissionalId?: string | null
    nome: string
    telefone: string
    email?: string | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoUncheckedCreateNestedManyWithoutPacienteInput
    atendimentos?: AtendimentoUncheckedCreateNestedManyWithoutPacienteInput
  }

  export type PacienteCreateOrConnectWithoutTenantInput = {
    where: PacienteWhereUniqueInput
    create: XOR<PacienteCreateWithoutTenantInput, PacienteUncheckedCreateWithoutTenantInput>
  }

  export type PacienteCreateManyTenantInputEnvelope = {
    data: PacienteCreateManyTenantInput | PacienteCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type ProcedimentoCreateWithoutTenantInput = {
    id?: string
    nome: string
    valor?: Decimal | DecimalJsLike | number | string | null
    duracaoMinutos: number
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoCreateNestedManyWithoutProcedimentoInput
    atendimentos?: AtendimentoCreateNestedManyWithoutProcedimentoInput
  }

  export type ProcedimentoUncheckedCreateWithoutTenantInput = {
    id?: string
    nome: string
    valor?: Decimal | DecimalJsLike | number | string | null
    duracaoMinutos: number
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoUncheckedCreateNestedManyWithoutProcedimentoInput
    atendimentos?: AtendimentoUncheckedCreateNestedManyWithoutProcedimentoInput
  }

  export type ProcedimentoCreateOrConnectWithoutTenantInput = {
    where: ProcedimentoWhereUniqueInput
    create: XOR<ProcedimentoCreateWithoutTenantInput, ProcedimentoUncheckedCreateWithoutTenantInput>
  }

  export type ProcedimentoCreateManyTenantInputEnvelope = {
    data: ProcedimentoCreateManyTenantInput | ProcedimentoCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type ProfissionalCreateWithoutTenantInput = {
    id?: string
    nome: string
    especialidade?: string | null
    observacoes?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoCreateNestedManyWithoutProfissionalInput
    atendimentos?: AtendimentoCreateNestedManyWithoutProfissionalInput
    pacientes?: PacienteCreateNestedManyWithoutProfissionalInput
  }

  export type ProfissionalUncheckedCreateWithoutTenantInput = {
    id?: string
    nome: string
    especialidade?: string | null
    observacoes?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoUncheckedCreateNestedManyWithoutProfissionalInput
    atendimentos?: AtendimentoUncheckedCreateNestedManyWithoutProfissionalInput
    pacientes?: PacienteUncheckedCreateNestedManyWithoutProfissionalInput
  }

  export type ProfissionalCreateOrConnectWithoutTenantInput = {
    where: ProfissionalWhereUniqueInput
    create: XOR<ProfissionalCreateWithoutTenantInput, ProfissionalUncheckedCreateWithoutTenantInput>
  }

  export type ProfissionalCreateManyTenantInputEnvelope = {
    data: ProfissionalCreateManyTenantInput | ProfissionalCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type UsuarioCreateWithoutTenantInput = {
    id?: string
    nome: string
    email: string
    senha: string
    tipo?: $Enums.TipoUsuario
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsuarioUncheckedCreateWithoutTenantInput = {
    id?: string
    nome: string
    email: string
    senha: string
    tipo?: $Enums.TipoUsuario
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsuarioCreateOrConnectWithoutTenantInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutTenantInput, UsuarioUncheckedCreateWithoutTenantInput>
  }

  export type UsuarioCreateManyTenantInputEnvelope = {
    data: UsuarioCreateManyTenantInput | UsuarioCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type WhatsAppConfigCreateWithoutTenantInput = {
    id?: string
    templateConfirmacao?: string
    templateSim?: string
    templateNao?: string
    templateOpcoesInvalidas?: string
    horasAntecedencia?: number
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WhatsAppConfigUncheckedCreateWithoutTenantInput = {
    id?: string
    templateConfirmacao?: string
    templateSim?: string
    templateNao?: string
    templateOpcoesInvalidas?: string
    horasAntecedencia?: number
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WhatsAppConfigCreateOrConnectWithoutTenantInput = {
    where: WhatsAppConfigWhereUniqueInput
    create: XOR<WhatsAppConfigCreateWithoutTenantInput, WhatsAppConfigUncheckedCreateWithoutTenantInput>
  }

  export type AgendamentoUpsertWithWhereUniqueWithoutTenantInput = {
    where: AgendamentoWhereUniqueInput
    update: XOR<AgendamentoUpdateWithoutTenantInput, AgendamentoUncheckedUpdateWithoutTenantInput>
    create: XOR<AgendamentoCreateWithoutTenantInput, AgendamentoUncheckedCreateWithoutTenantInput>
  }

  export type AgendamentoUpdateWithWhereUniqueWithoutTenantInput = {
    where: AgendamentoWhereUniqueInput
    data: XOR<AgendamentoUpdateWithoutTenantInput, AgendamentoUncheckedUpdateWithoutTenantInput>
  }

  export type AgendamentoUpdateManyWithWhereWithoutTenantInput = {
    where: AgendamentoScalarWhereInput
    data: XOR<AgendamentoUpdateManyMutationInput, AgendamentoUncheckedUpdateManyWithoutTenantInput>
  }

  export type AgendamentoScalarWhereInput = {
    AND?: AgendamentoScalarWhereInput | AgendamentoScalarWhereInput[]
    OR?: AgendamentoScalarWhereInput[]
    NOT?: AgendamentoScalarWhereInput | AgendamentoScalarWhereInput[]
    id?: StringFilter<"Agendamento"> | string
    tenantId?: StringFilter<"Agendamento"> | string
    pacienteId?: StringNullableFilter<"Agendamento"> | string | null
    profissionalId?: StringFilter<"Agendamento"> | string
    procedimentoId?: StringFilter<"Agendamento"> | string
    dataHora?: DateTimeFilter<"Agendamento"> | Date | string
    status?: EnumStatusAgendamentoFilter<"Agendamento"> | $Enums.StatusAgendamento
    observacoes?: StringNullableFilter<"Agendamento"> | string | null
    confirmacaoEnviada?: BoolFilter<"Agendamento"> | boolean
    createdAt?: DateTimeFilter<"Agendamento"> | Date | string
    updatedAt?: DateTimeFilter<"Agendamento"> | Date | string
    dataHoraFim?: DateTimeFilter<"Agendamento"> | Date | string
  }

  export type AtendimentoUpsertWithWhereUniqueWithoutTenantInput = {
    where: AtendimentoWhereUniqueInput
    update: XOR<AtendimentoUpdateWithoutTenantInput, AtendimentoUncheckedUpdateWithoutTenantInput>
    create: XOR<AtendimentoCreateWithoutTenantInput, AtendimentoUncheckedCreateWithoutTenantInput>
  }

  export type AtendimentoUpdateWithWhereUniqueWithoutTenantInput = {
    where: AtendimentoWhereUniqueInput
    data: XOR<AtendimentoUpdateWithoutTenantInput, AtendimentoUncheckedUpdateWithoutTenantInput>
  }

  export type AtendimentoUpdateManyWithWhereWithoutTenantInput = {
    where: AtendimentoScalarWhereInput
    data: XOR<AtendimentoUpdateManyMutationInput, AtendimentoUncheckedUpdateManyWithoutTenantInput>
  }

  export type AtendimentoScalarWhereInput = {
    AND?: AtendimentoScalarWhereInput | AtendimentoScalarWhereInput[]
    OR?: AtendimentoScalarWhereInput[]
    NOT?: AtendimentoScalarWhereInput | AtendimentoScalarWhereInput[]
    id?: StringFilter<"Atendimento"> | string
    tenantId?: StringFilter<"Atendimento"> | string
    agendamentoId?: StringFilter<"Atendimento"> | string
    pacienteId?: StringFilter<"Atendimento"> | string
    profissionalId?: StringFilter<"Atendimento"> | string
    procedimentoId?: StringFilter<"Atendimento"> | string
    anotacoes?: StringNullableFilter<"Atendimento"> | string | null
    procedimentosRealizados?: JsonNullableFilter<"Atendimento">
    createdAt?: DateTimeFilter<"Atendimento"> | Date | string
    updatedAt?: DateTimeFilter<"Atendimento"> | Date | string
  }

  export type PacienteUpsertWithWhereUniqueWithoutTenantInput = {
    where: PacienteWhereUniqueInput
    update: XOR<PacienteUpdateWithoutTenantInput, PacienteUncheckedUpdateWithoutTenantInput>
    create: XOR<PacienteCreateWithoutTenantInput, PacienteUncheckedCreateWithoutTenantInput>
  }

  export type PacienteUpdateWithWhereUniqueWithoutTenantInput = {
    where: PacienteWhereUniqueInput
    data: XOR<PacienteUpdateWithoutTenantInput, PacienteUncheckedUpdateWithoutTenantInput>
  }

  export type PacienteUpdateManyWithWhereWithoutTenantInput = {
    where: PacienteScalarWhereInput
    data: XOR<PacienteUpdateManyMutationInput, PacienteUncheckedUpdateManyWithoutTenantInput>
  }

  export type PacienteScalarWhereInput = {
    AND?: PacienteScalarWhereInput | PacienteScalarWhereInput[]
    OR?: PacienteScalarWhereInput[]
    NOT?: PacienteScalarWhereInput | PacienteScalarWhereInput[]
    id?: StringFilter<"Paciente"> | string
    tenantId?: StringFilter<"Paciente"> | string
    profissionalId?: StringNullableFilter<"Paciente"> | string | null
    nome?: StringFilter<"Paciente"> | string
    telefone?: StringFilter<"Paciente"> | string
    email?: StringNullableFilter<"Paciente"> | string | null
    observacoes?: StringNullableFilter<"Paciente"> | string | null
    createdAt?: DateTimeFilter<"Paciente"> | Date | string
    updatedAt?: DateTimeFilter<"Paciente"> | Date | string
  }

  export type ProcedimentoUpsertWithWhereUniqueWithoutTenantInput = {
    where: ProcedimentoWhereUniqueInput
    update: XOR<ProcedimentoUpdateWithoutTenantInput, ProcedimentoUncheckedUpdateWithoutTenantInput>
    create: XOR<ProcedimentoCreateWithoutTenantInput, ProcedimentoUncheckedCreateWithoutTenantInput>
  }

  export type ProcedimentoUpdateWithWhereUniqueWithoutTenantInput = {
    where: ProcedimentoWhereUniqueInput
    data: XOR<ProcedimentoUpdateWithoutTenantInput, ProcedimentoUncheckedUpdateWithoutTenantInput>
  }

  export type ProcedimentoUpdateManyWithWhereWithoutTenantInput = {
    where: ProcedimentoScalarWhereInput
    data: XOR<ProcedimentoUpdateManyMutationInput, ProcedimentoUncheckedUpdateManyWithoutTenantInput>
  }

  export type ProcedimentoScalarWhereInput = {
    AND?: ProcedimentoScalarWhereInput | ProcedimentoScalarWhereInput[]
    OR?: ProcedimentoScalarWhereInput[]
    NOT?: ProcedimentoScalarWhereInput | ProcedimentoScalarWhereInput[]
    id?: StringFilter<"Procedimento"> | string
    tenantId?: StringFilter<"Procedimento"> | string
    nome?: StringFilter<"Procedimento"> | string
    valor?: DecimalNullableFilter<"Procedimento"> | Decimal | DecimalJsLike | number | string | null
    duracaoMinutos?: IntFilter<"Procedimento"> | number
    createdAt?: DateTimeFilter<"Procedimento"> | Date | string
    updatedAt?: DateTimeFilter<"Procedimento"> | Date | string
  }

  export type ProfissionalUpsertWithWhereUniqueWithoutTenantInput = {
    where: ProfissionalWhereUniqueInput
    update: XOR<ProfissionalUpdateWithoutTenantInput, ProfissionalUncheckedUpdateWithoutTenantInput>
    create: XOR<ProfissionalCreateWithoutTenantInput, ProfissionalUncheckedCreateWithoutTenantInput>
  }

  export type ProfissionalUpdateWithWhereUniqueWithoutTenantInput = {
    where: ProfissionalWhereUniqueInput
    data: XOR<ProfissionalUpdateWithoutTenantInput, ProfissionalUncheckedUpdateWithoutTenantInput>
  }

  export type ProfissionalUpdateManyWithWhereWithoutTenantInput = {
    where: ProfissionalScalarWhereInput
    data: XOR<ProfissionalUpdateManyMutationInput, ProfissionalUncheckedUpdateManyWithoutTenantInput>
  }

  export type ProfissionalScalarWhereInput = {
    AND?: ProfissionalScalarWhereInput | ProfissionalScalarWhereInput[]
    OR?: ProfissionalScalarWhereInput[]
    NOT?: ProfissionalScalarWhereInput | ProfissionalScalarWhereInput[]
    id?: StringFilter<"Profissional"> | string
    tenantId?: StringFilter<"Profissional"> | string
    nome?: StringFilter<"Profissional"> | string
    especialidade?: StringNullableFilter<"Profissional"> | string | null
    observacoes?: StringNullableFilter<"Profissional"> | string | null
    ativo?: BoolFilter<"Profissional"> | boolean
    createdAt?: DateTimeFilter<"Profissional"> | Date | string
    updatedAt?: DateTimeFilter<"Profissional"> | Date | string
  }

  export type UsuarioUpsertWithWhereUniqueWithoutTenantInput = {
    where: UsuarioWhereUniqueInput
    update: XOR<UsuarioUpdateWithoutTenantInput, UsuarioUncheckedUpdateWithoutTenantInput>
    create: XOR<UsuarioCreateWithoutTenantInput, UsuarioUncheckedCreateWithoutTenantInput>
  }

  export type UsuarioUpdateWithWhereUniqueWithoutTenantInput = {
    where: UsuarioWhereUniqueInput
    data: XOR<UsuarioUpdateWithoutTenantInput, UsuarioUncheckedUpdateWithoutTenantInput>
  }

  export type UsuarioUpdateManyWithWhereWithoutTenantInput = {
    where: UsuarioScalarWhereInput
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyWithoutTenantInput>
  }

  export type UsuarioScalarWhereInput = {
    AND?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
    OR?: UsuarioScalarWhereInput[]
    NOT?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
    id?: StringFilter<"Usuario"> | string
    tenantId?: StringFilter<"Usuario"> | string
    nome?: StringFilter<"Usuario"> | string
    email?: StringFilter<"Usuario"> | string
    senha?: StringFilter<"Usuario"> | string
    tipo?: EnumTipoUsuarioFilter<"Usuario"> | $Enums.TipoUsuario
    ativo?: BoolFilter<"Usuario"> | boolean
    createdAt?: DateTimeFilter<"Usuario"> | Date | string
    updatedAt?: DateTimeFilter<"Usuario"> | Date | string
  }

  export type WhatsAppConfigUpsertWithoutTenantInput = {
    update: XOR<WhatsAppConfigUpdateWithoutTenantInput, WhatsAppConfigUncheckedUpdateWithoutTenantInput>
    create: XOR<WhatsAppConfigCreateWithoutTenantInput, WhatsAppConfigUncheckedCreateWithoutTenantInput>
    where?: WhatsAppConfigWhereInput
  }

  export type WhatsAppConfigUpdateToOneWithWhereWithoutTenantInput = {
    where?: WhatsAppConfigWhereInput
    data: XOR<WhatsAppConfigUpdateWithoutTenantInput, WhatsAppConfigUncheckedUpdateWithoutTenantInput>
  }

  export type WhatsAppConfigUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    templateConfirmacao?: StringFieldUpdateOperationsInput | string
    templateSim?: StringFieldUpdateOperationsInput | string
    templateNao?: StringFieldUpdateOperationsInput | string
    templateOpcoesInvalidas?: StringFieldUpdateOperationsInput | string
    horasAntecedencia?: IntFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WhatsAppConfigUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    templateConfirmacao?: StringFieldUpdateOperationsInput | string
    templateSim?: StringFieldUpdateOperationsInput | string
    templateNao?: StringFieldUpdateOperationsInput | string
    templateOpcoesInvalidas?: StringFieldUpdateOperationsInput | string
    horasAntecedencia?: IntFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantCreateWithoutUsuariosInput = {
    id?: string
    nome: string
    plano?: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoCreateNestedManyWithoutTenantInput
    atendimentos?: AtendimentoCreateNestedManyWithoutTenantInput
    pacientes?: PacienteCreateNestedManyWithoutTenantInput
    procedimentos?: ProcedimentoCreateNestedManyWithoutTenantInput
    profissionais?: ProfissionalCreateNestedManyWithoutTenantInput
    whatsappConfig?: WhatsAppConfigCreateNestedOneWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutUsuariosInput = {
    id?: string
    nome: string
    plano?: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoUncheckedCreateNestedManyWithoutTenantInput
    atendimentos?: AtendimentoUncheckedCreateNestedManyWithoutTenantInput
    pacientes?: PacienteUncheckedCreateNestedManyWithoutTenantInput
    procedimentos?: ProcedimentoUncheckedCreateNestedManyWithoutTenantInput
    profissionais?: ProfissionalUncheckedCreateNestedManyWithoutTenantInput
    whatsappConfig?: WhatsAppConfigUncheckedCreateNestedOneWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutUsuariosInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutUsuariosInput, TenantUncheckedCreateWithoutUsuariosInput>
  }

  export type TenantUpsertWithoutUsuariosInput = {
    update: XOR<TenantUpdateWithoutUsuariosInput, TenantUncheckedUpdateWithoutUsuariosInput>
    create: XOR<TenantCreateWithoutUsuariosInput, TenantUncheckedCreateWithoutUsuariosInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutUsuariosInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutUsuariosInput, TenantUncheckedUpdateWithoutUsuariosInput>
  }

  export type TenantUpdateWithoutUsuariosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUpdateManyWithoutTenantNestedInput
    atendimentos?: AtendimentoUpdateManyWithoutTenantNestedInput
    pacientes?: PacienteUpdateManyWithoutTenantNestedInput
    procedimentos?: ProcedimentoUpdateManyWithoutTenantNestedInput
    profissionais?: ProfissionalUpdateManyWithoutTenantNestedInput
    whatsappConfig?: WhatsAppConfigUpdateOneWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutUsuariosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUncheckedUpdateManyWithoutTenantNestedInput
    atendimentos?: AtendimentoUncheckedUpdateManyWithoutTenantNestedInput
    pacientes?: PacienteUncheckedUpdateManyWithoutTenantNestedInput
    procedimentos?: ProcedimentoUncheckedUpdateManyWithoutTenantNestedInput
    profissionais?: ProfissionalUncheckedUpdateManyWithoutTenantNestedInput
    whatsappConfig?: WhatsAppConfigUncheckedUpdateOneWithoutTenantNestedInput
  }

  export type AgendamentoCreateWithoutProfissionalInput = {
    id?: string
    dataHora: Date | string
    status?: $Enums.StatusAgendamento
    observacoes?: string | null
    confirmacaoEnviada?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dataHoraFim: Date | string
    paciente?: PacienteCreateNestedOneWithoutAgendamentosInput
    procedimento: ProcedimentoCreateNestedOneWithoutAgendamentosInput
    tenant: TenantCreateNestedOneWithoutAgendamentosInput
    atendimento?: AtendimentoCreateNestedOneWithoutAgendamentoInput
  }

  export type AgendamentoUncheckedCreateWithoutProfissionalInput = {
    id?: string
    tenantId: string
    pacienteId?: string | null
    procedimentoId: string
    dataHora: Date | string
    status?: $Enums.StatusAgendamento
    observacoes?: string | null
    confirmacaoEnviada?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dataHoraFim: Date | string
    atendimento?: AtendimentoUncheckedCreateNestedOneWithoutAgendamentoInput
  }

  export type AgendamentoCreateOrConnectWithoutProfissionalInput = {
    where: AgendamentoWhereUniqueInput
    create: XOR<AgendamentoCreateWithoutProfissionalInput, AgendamentoUncheckedCreateWithoutProfissionalInput>
  }

  export type AgendamentoCreateManyProfissionalInputEnvelope = {
    data: AgendamentoCreateManyProfissionalInput | AgendamentoCreateManyProfissionalInput[]
    skipDuplicates?: boolean
  }

  export type AtendimentoCreateWithoutProfissionalInput = {
    id?: string
    anotacoes?: string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamento: AgendamentoCreateNestedOneWithoutAtendimentoInput
    paciente: PacienteCreateNestedOneWithoutAtendimentosInput
    procedimento: ProcedimentoCreateNestedOneWithoutAtendimentosInput
    tenant: TenantCreateNestedOneWithoutAtendimentosInput
  }

  export type AtendimentoUncheckedCreateWithoutProfissionalInput = {
    id?: string
    tenantId: string
    agendamentoId: string
    pacienteId: string
    procedimentoId: string
    anotacoes?: string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AtendimentoCreateOrConnectWithoutProfissionalInput = {
    where: AtendimentoWhereUniqueInput
    create: XOR<AtendimentoCreateWithoutProfissionalInput, AtendimentoUncheckedCreateWithoutProfissionalInput>
  }

  export type AtendimentoCreateManyProfissionalInputEnvelope = {
    data: AtendimentoCreateManyProfissionalInput | AtendimentoCreateManyProfissionalInput[]
    skipDuplicates?: boolean
  }

  export type PacienteCreateWithoutProfissionalInput = {
    id?: string
    nome: string
    telefone: string
    email?: string | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoCreateNestedManyWithoutPacienteInput
    atendimentos?: AtendimentoCreateNestedManyWithoutPacienteInput
    tenant: TenantCreateNestedOneWithoutPacientesInput
  }

  export type PacienteUncheckedCreateWithoutProfissionalInput = {
    id?: string
    tenantId: string
    nome: string
    telefone: string
    email?: string | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoUncheckedCreateNestedManyWithoutPacienteInput
    atendimentos?: AtendimentoUncheckedCreateNestedManyWithoutPacienteInput
  }

  export type PacienteCreateOrConnectWithoutProfissionalInput = {
    where: PacienteWhereUniqueInput
    create: XOR<PacienteCreateWithoutProfissionalInput, PacienteUncheckedCreateWithoutProfissionalInput>
  }

  export type PacienteCreateManyProfissionalInputEnvelope = {
    data: PacienteCreateManyProfissionalInput | PacienteCreateManyProfissionalInput[]
    skipDuplicates?: boolean
  }

  export type TenantCreateWithoutProfissionaisInput = {
    id?: string
    nome: string
    plano?: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoCreateNestedManyWithoutTenantInput
    atendimentos?: AtendimentoCreateNestedManyWithoutTenantInput
    pacientes?: PacienteCreateNestedManyWithoutTenantInput
    procedimentos?: ProcedimentoCreateNestedManyWithoutTenantInput
    usuarios?: UsuarioCreateNestedManyWithoutTenantInput
    whatsappConfig?: WhatsAppConfigCreateNestedOneWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutProfissionaisInput = {
    id?: string
    nome: string
    plano?: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoUncheckedCreateNestedManyWithoutTenantInput
    atendimentos?: AtendimentoUncheckedCreateNestedManyWithoutTenantInput
    pacientes?: PacienteUncheckedCreateNestedManyWithoutTenantInput
    procedimentos?: ProcedimentoUncheckedCreateNestedManyWithoutTenantInput
    usuarios?: UsuarioUncheckedCreateNestedManyWithoutTenantInput
    whatsappConfig?: WhatsAppConfigUncheckedCreateNestedOneWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutProfissionaisInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutProfissionaisInput, TenantUncheckedCreateWithoutProfissionaisInput>
  }

  export type AgendamentoUpsertWithWhereUniqueWithoutProfissionalInput = {
    where: AgendamentoWhereUniqueInput
    update: XOR<AgendamentoUpdateWithoutProfissionalInput, AgendamentoUncheckedUpdateWithoutProfissionalInput>
    create: XOR<AgendamentoCreateWithoutProfissionalInput, AgendamentoUncheckedCreateWithoutProfissionalInput>
  }

  export type AgendamentoUpdateWithWhereUniqueWithoutProfissionalInput = {
    where: AgendamentoWhereUniqueInput
    data: XOR<AgendamentoUpdateWithoutProfissionalInput, AgendamentoUncheckedUpdateWithoutProfissionalInput>
  }

  export type AgendamentoUpdateManyWithWhereWithoutProfissionalInput = {
    where: AgendamentoScalarWhereInput
    data: XOR<AgendamentoUpdateManyMutationInput, AgendamentoUncheckedUpdateManyWithoutProfissionalInput>
  }

  export type AtendimentoUpsertWithWhereUniqueWithoutProfissionalInput = {
    where: AtendimentoWhereUniqueInput
    update: XOR<AtendimentoUpdateWithoutProfissionalInput, AtendimentoUncheckedUpdateWithoutProfissionalInput>
    create: XOR<AtendimentoCreateWithoutProfissionalInput, AtendimentoUncheckedCreateWithoutProfissionalInput>
  }

  export type AtendimentoUpdateWithWhereUniqueWithoutProfissionalInput = {
    where: AtendimentoWhereUniqueInput
    data: XOR<AtendimentoUpdateWithoutProfissionalInput, AtendimentoUncheckedUpdateWithoutProfissionalInput>
  }

  export type AtendimentoUpdateManyWithWhereWithoutProfissionalInput = {
    where: AtendimentoScalarWhereInput
    data: XOR<AtendimentoUpdateManyMutationInput, AtendimentoUncheckedUpdateManyWithoutProfissionalInput>
  }

  export type PacienteUpsertWithWhereUniqueWithoutProfissionalInput = {
    where: PacienteWhereUniqueInput
    update: XOR<PacienteUpdateWithoutProfissionalInput, PacienteUncheckedUpdateWithoutProfissionalInput>
    create: XOR<PacienteCreateWithoutProfissionalInput, PacienteUncheckedCreateWithoutProfissionalInput>
  }

  export type PacienteUpdateWithWhereUniqueWithoutProfissionalInput = {
    where: PacienteWhereUniqueInput
    data: XOR<PacienteUpdateWithoutProfissionalInput, PacienteUncheckedUpdateWithoutProfissionalInput>
  }

  export type PacienteUpdateManyWithWhereWithoutProfissionalInput = {
    where: PacienteScalarWhereInput
    data: XOR<PacienteUpdateManyMutationInput, PacienteUncheckedUpdateManyWithoutProfissionalInput>
  }

  export type TenantUpsertWithoutProfissionaisInput = {
    update: XOR<TenantUpdateWithoutProfissionaisInput, TenantUncheckedUpdateWithoutProfissionaisInput>
    create: XOR<TenantCreateWithoutProfissionaisInput, TenantUncheckedCreateWithoutProfissionaisInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutProfissionaisInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutProfissionaisInput, TenantUncheckedUpdateWithoutProfissionaisInput>
  }

  export type TenantUpdateWithoutProfissionaisInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUpdateManyWithoutTenantNestedInput
    atendimentos?: AtendimentoUpdateManyWithoutTenantNestedInput
    pacientes?: PacienteUpdateManyWithoutTenantNestedInput
    procedimentos?: ProcedimentoUpdateManyWithoutTenantNestedInput
    usuarios?: UsuarioUpdateManyWithoutTenantNestedInput
    whatsappConfig?: WhatsAppConfigUpdateOneWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutProfissionaisInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUncheckedUpdateManyWithoutTenantNestedInput
    atendimentos?: AtendimentoUncheckedUpdateManyWithoutTenantNestedInput
    pacientes?: PacienteUncheckedUpdateManyWithoutTenantNestedInput
    procedimentos?: ProcedimentoUncheckedUpdateManyWithoutTenantNestedInput
    usuarios?: UsuarioUncheckedUpdateManyWithoutTenantNestedInput
    whatsappConfig?: WhatsAppConfigUncheckedUpdateOneWithoutTenantNestedInput
  }

  export type AgendamentoCreateWithoutPacienteInput = {
    id?: string
    dataHora: Date | string
    status?: $Enums.StatusAgendamento
    observacoes?: string | null
    confirmacaoEnviada?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dataHoraFim: Date | string
    procedimento: ProcedimentoCreateNestedOneWithoutAgendamentosInput
    profissional: ProfissionalCreateNestedOneWithoutAgendamentosInput
    tenant: TenantCreateNestedOneWithoutAgendamentosInput
    atendimento?: AtendimentoCreateNestedOneWithoutAgendamentoInput
  }

  export type AgendamentoUncheckedCreateWithoutPacienteInput = {
    id?: string
    tenantId: string
    profissionalId: string
    procedimentoId: string
    dataHora: Date | string
    status?: $Enums.StatusAgendamento
    observacoes?: string | null
    confirmacaoEnviada?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dataHoraFim: Date | string
    atendimento?: AtendimentoUncheckedCreateNestedOneWithoutAgendamentoInput
  }

  export type AgendamentoCreateOrConnectWithoutPacienteInput = {
    where: AgendamentoWhereUniqueInput
    create: XOR<AgendamentoCreateWithoutPacienteInput, AgendamentoUncheckedCreateWithoutPacienteInput>
  }

  export type AgendamentoCreateManyPacienteInputEnvelope = {
    data: AgendamentoCreateManyPacienteInput | AgendamentoCreateManyPacienteInput[]
    skipDuplicates?: boolean
  }

  export type AtendimentoCreateWithoutPacienteInput = {
    id?: string
    anotacoes?: string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamento: AgendamentoCreateNestedOneWithoutAtendimentoInput
    procedimento: ProcedimentoCreateNestedOneWithoutAtendimentosInput
    profissional: ProfissionalCreateNestedOneWithoutAtendimentosInput
    tenant: TenantCreateNestedOneWithoutAtendimentosInput
  }

  export type AtendimentoUncheckedCreateWithoutPacienteInput = {
    id?: string
    tenantId: string
    agendamentoId: string
    profissionalId: string
    procedimentoId: string
    anotacoes?: string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AtendimentoCreateOrConnectWithoutPacienteInput = {
    where: AtendimentoWhereUniqueInput
    create: XOR<AtendimentoCreateWithoutPacienteInput, AtendimentoUncheckedCreateWithoutPacienteInput>
  }

  export type AtendimentoCreateManyPacienteInputEnvelope = {
    data: AtendimentoCreateManyPacienteInput | AtendimentoCreateManyPacienteInput[]
    skipDuplicates?: boolean
  }

  export type ProfissionalCreateWithoutPacientesInput = {
    id?: string
    nome: string
    especialidade?: string | null
    observacoes?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoCreateNestedManyWithoutProfissionalInput
    atendimentos?: AtendimentoCreateNestedManyWithoutProfissionalInput
    tenant: TenantCreateNestedOneWithoutProfissionaisInput
  }

  export type ProfissionalUncheckedCreateWithoutPacientesInput = {
    id?: string
    tenantId: string
    nome: string
    especialidade?: string | null
    observacoes?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoUncheckedCreateNestedManyWithoutProfissionalInput
    atendimentos?: AtendimentoUncheckedCreateNestedManyWithoutProfissionalInput
  }

  export type ProfissionalCreateOrConnectWithoutPacientesInput = {
    where: ProfissionalWhereUniqueInput
    create: XOR<ProfissionalCreateWithoutPacientesInput, ProfissionalUncheckedCreateWithoutPacientesInput>
  }

  export type TenantCreateWithoutPacientesInput = {
    id?: string
    nome: string
    plano?: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoCreateNestedManyWithoutTenantInput
    atendimentos?: AtendimentoCreateNestedManyWithoutTenantInput
    procedimentos?: ProcedimentoCreateNestedManyWithoutTenantInput
    profissionais?: ProfissionalCreateNestedManyWithoutTenantInput
    usuarios?: UsuarioCreateNestedManyWithoutTenantInput
    whatsappConfig?: WhatsAppConfigCreateNestedOneWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutPacientesInput = {
    id?: string
    nome: string
    plano?: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoUncheckedCreateNestedManyWithoutTenantInput
    atendimentos?: AtendimentoUncheckedCreateNestedManyWithoutTenantInput
    procedimentos?: ProcedimentoUncheckedCreateNestedManyWithoutTenantInput
    profissionais?: ProfissionalUncheckedCreateNestedManyWithoutTenantInput
    usuarios?: UsuarioUncheckedCreateNestedManyWithoutTenantInput
    whatsappConfig?: WhatsAppConfigUncheckedCreateNestedOneWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutPacientesInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutPacientesInput, TenantUncheckedCreateWithoutPacientesInput>
  }

  export type AgendamentoUpsertWithWhereUniqueWithoutPacienteInput = {
    where: AgendamentoWhereUniqueInput
    update: XOR<AgendamentoUpdateWithoutPacienteInput, AgendamentoUncheckedUpdateWithoutPacienteInput>
    create: XOR<AgendamentoCreateWithoutPacienteInput, AgendamentoUncheckedCreateWithoutPacienteInput>
  }

  export type AgendamentoUpdateWithWhereUniqueWithoutPacienteInput = {
    where: AgendamentoWhereUniqueInput
    data: XOR<AgendamentoUpdateWithoutPacienteInput, AgendamentoUncheckedUpdateWithoutPacienteInput>
  }

  export type AgendamentoUpdateManyWithWhereWithoutPacienteInput = {
    where: AgendamentoScalarWhereInput
    data: XOR<AgendamentoUpdateManyMutationInput, AgendamentoUncheckedUpdateManyWithoutPacienteInput>
  }

  export type AtendimentoUpsertWithWhereUniqueWithoutPacienteInput = {
    where: AtendimentoWhereUniqueInput
    update: XOR<AtendimentoUpdateWithoutPacienteInput, AtendimentoUncheckedUpdateWithoutPacienteInput>
    create: XOR<AtendimentoCreateWithoutPacienteInput, AtendimentoUncheckedCreateWithoutPacienteInput>
  }

  export type AtendimentoUpdateWithWhereUniqueWithoutPacienteInput = {
    where: AtendimentoWhereUniqueInput
    data: XOR<AtendimentoUpdateWithoutPacienteInput, AtendimentoUncheckedUpdateWithoutPacienteInput>
  }

  export type AtendimentoUpdateManyWithWhereWithoutPacienteInput = {
    where: AtendimentoScalarWhereInput
    data: XOR<AtendimentoUpdateManyMutationInput, AtendimentoUncheckedUpdateManyWithoutPacienteInput>
  }

  export type ProfissionalUpsertWithoutPacientesInput = {
    update: XOR<ProfissionalUpdateWithoutPacientesInput, ProfissionalUncheckedUpdateWithoutPacientesInput>
    create: XOR<ProfissionalCreateWithoutPacientesInput, ProfissionalUncheckedCreateWithoutPacientesInput>
    where?: ProfissionalWhereInput
  }

  export type ProfissionalUpdateToOneWithWhereWithoutPacientesInput = {
    where?: ProfissionalWhereInput
    data: XOR<ProfissionalUpdateWithoutPacientesInput, ProfissionalUncheckedUpdateWithoutPacientesInput>
  }

  export type ProfissionalUpdateWithoutPacientesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    especialidade?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUpdateManyWithoutProfissionalNestedInput
    atendimentos?: AtendimentoUpdateManyWithoutProfissionalNestedInput
    tenant?: TenantUpdateOneRequiredWithoutProfissionaisNestedInput
  }

  export type ProfissionalUncheckedUpdateWithoutPacientesInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    especialidade?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUncheckedUpdateManyWithoutProfissionalNestedInput
    atendimentos?: AtendimentoUncheckedUpdateManyWithoutProfissionalNestedInput
  }

  export type TenantUpsertWithoutPacientesInput = {
    update: XOR<TenantUpdateWithoutPacientesInput, TenantUncheckedUpdateWithoutPacientesInput>
    create: XOR<TenantCreateWithoutPacientesInput, TenantUncheckedCreateWithoutPacientesInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutPacientesInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutPacientesInput, TenantUncheckedUpdateWithoutPacientesInput>
  }

  export type TenantUpdateWithoutPacientesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUpdateManyWithoutTenantNestedInput
    atendimentos?: AtendimentoUpdateManyWithoutTenantNestedInput
    procedimentos?: ProcedimentoUpdateManyWithoutTenantNestedInput
    profissionais?: ProfissionalUpdateManyWithoutTenantNestedInput
    usuarios?: UsuarioUpdateManyWithoutTenantNestedInput
    whatsappConfig?: WhatsAppConfigUpdateOneWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutPacientesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUncheckedUpdateManyWithoutTenantNestedInput
    atendimentos?: AtendimentoUncheckedUpdateManyWithoutTenantNestedInput
    procedimentos?: ProcedimentoUncheckedUpdateManyWithoutTenantNestedInput
    profissionais?: ProfissionalUncheckedUpdateManyWithoutTenantNestedInput
    usuarios?: UsuarioUncheckedUpdateManyWithoutTenantNestedInput
    whatsappConfig?: WhatsAppConfigUncheckedUpdateOneWithoutTenantNestedInput
  }

  export type AgendamentoCreateWithoutProcedimentoInput = {
    id?: string
    dataHora: Date | string
    status?: $Enums.StatusAgendamento
    observacoes?: string | null
    confirmacaoEnviada?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dataHoraFim: Date | string
    paciente?: PacienteCreateNestedOneWithoutAgendamentosInput
    profissional: ProfissionalCreateNestedOneWithoutAgendamentosInput
    tenant: TenantCreateNestedOneWithoutAgendamentosInput
    atendimento?: AtendimentoCreateNestedOneWithoutAgendamentoInput
  }

  export type AgendamentoUncheckedCreateWithoutProcedimentoInput = {
    id?: string
    tenantId: string
    pacienteId?: string | null
    profissionalId: string
    dataHora: Date | string
    status?: $Enums.StatusAgendamento
    observacoes?: string | null
    confirmacaoEnviada?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dataHoraFim: Date | string
    atendimento?: AtendimentoUncheckedCreateNestedOneWithoutAgendamentoInput
  }

  export type AgendamentoCreateOrConnectWithoutProcedimentoInput = {
    where: AgendamentoWhereUniqueInput
    create: XOR<AgendamentoCreateWithoutProcedimentoInput, AgendamentoUncheckedCreateWithoutProcedimentoInput>
  }

  export type AgendamentoCreateManyProcedimentoInputEnvelope = {
    data: AgendamentoCreateManyProcedimentoInput | AgendamentoCreateManyProcedimentoInput[]
    skipDuplicates?: boolean
  }

  export type AtendimentoCreateWithoutProcedimentoInput = {
    id?: string
    anotacoes?: string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamento: AgendamentoCreateNestedOneWithoutAtendimentoInput
    paciente: PacienteCreateNestedOneWithoutAtendimentosInput
    profissional: ProfissionalCreateNestedOneWithoutAtendimentosInput
    tenant: TenantCreateNestedOneWithoutAtendimentosInput
  }

  export type AtendimentoUncheckedCreateWithoutProcedimentoInput = {
    id?: string
    tenantId: string
    agendamentoId: string
    pacienteId: string
    profissionalId: string
    anotacoes?: string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AtendimentoCreateOrConnectWithoutProcedimentoInput = {
    where: AtendimentoWhereUniqueInput
    create: XOR<AtendimentoCreateWithoutProcedimentoInput, AtendimentoUncheckedCreateWithoutProcedimentoInput>
  }

  export type AtendimentoCreateManyProcedimentoInputEnvelope = {
    data: AtendimentoCreateManyProcedimentoInput | AtendimentoCreateManyProcedimentoInput[]
    skipDuplicates?: boolean
  }

  export type TenantCreateWithoutProcedimentosInput = {
    id?: string
    nome: string
    plano?: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoCreateNestedManyWithoutTenantInput
    atendimentos?: AtendimentoCreateNestedManyWithoutTenantInput
    pacientes?: PacienteCreateNestedManyWithoutTenantInput
    profissionais?: ProfissionalCreateNestedManyWithoutTenantInput
    usuarios?: UsuarioCreateNestedManyWithoutTenantInput
    whatsappConfig?: WhatsAppConfigCreateNestedOneWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutProcedimentosInput = {
    id?: string
    nome: string
    plano?: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoUncheckedCreateNestedManyWithoutTenantInput
    atendimentos?: AtendimentoUncheckedCreateNestedManyWithoutTenantInput
    pacientes?: PacienteUncheckedCreateNestedManyWithoutTenantInput
    profissionais?: ProfissionalUncheckedCreateNestedManyWithoutTenantInput
    usuarios?: UsuarioUncheckedCreateNestedManyWithoutTenantInput
    whatsappConfig?: WhatsAppConfigUncheckedCreateNestedOneWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutProcedimentosInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutProcedimentosInput, TenantUncheckedCreateWithoutProcedimentosInput>
  }

  export type AgendamentoUpsertWithWhereUniqueWithoutProcedimentoInput = {
    where: AgendamentoWhereUniqueInput
    update: XOR<AgendamentoUpdateWithoutProcedimentoInput, AgendamentoUncheckedUpdateWithoutProcedimentoInput>
    create: XOR<AgendamentoCreateWithoutProcedimentoInput, AgendamentoUncheckedCreateWithoutProcedimentoInput>
  }

  export type AgendamentoUpdateWithWhereUniqueWithoutProcedimentoInput = {
    where: AgendamentoWhereUniqueInput
    data: XOR<AgendamentoUpdateWithoutProcedimentoInput, AgendamentoUncheckedUpdateWithoutProcedimentoInput>
  }

  export type AgendamentoUpdateManyWithWhereWithoutProcedimentoInput = {
    where: AgendamentoScalarWhereInput
    data: XOR<AgendamentoUpdateManyMutationInput, AgendamentoUncheckedUpdateManyWithoutProcedimentoInput>
  }

  export type AtendimentoUpsertWithWhereUniqueWithoutProcedimentoInput = {
    where: AtendimentoWhereUniqueInput
    update: XOR<AtendimentoUpdateWithoutProcedimentoInput, AtendimentoUncheckedUpdateWithoutProcedimentoInput>
    create: XOR<AtendimentoCreateWithoutProcedimentoInput, AtendimentoUncheckedCreateWithoutProcedimentoInput>
  }

  export type AtendimentoUpdateWithWhereUniqueWithoutProcedimentoInput = {
    where: AtendimentoWhereUniqueInput
    data: XOR<AtendimentoUpdateWithoutProcedimentoInput, AtendimentoUncheckedUpdateWithoutProcedimentoInput>
  }

  export type AtendimentoUpdateManyWithWhereWithoutProcedimentoInput = {
    where: AtendimentoScalarWhereInput
    data: XOR<AtendimentoUpdateManyMutationInput, AtendimentoUncheckedUpdateManyWithoutProcedimentoInput>
  }

  export type TenantUpsertWithoutProcedimentosInput = {
    update: XOR<TenantUpdateWithoutProcedimentosInput, TenantUncheckedUpdateWithoutProcedimentosInput>
    create: XOR<TenantCreateWithoutProcedimentosInput, TenantUncheckedCreateWithoutProcedimentosInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutProcedimentosInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutProcedimentosInput, TenantUncheckedUpdateWithoutProcedimentosInput>
  }

  export type TenantUpdateWithoutProcedimentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUpdateManyWithoutTenantNestedInput
    atendimentos?: AtendimentoUpdateManyWithoutTenantNestedInput
    pacientes?: PacienteUpdateManyWithoutTenantNestedInput
    profissionais?: ProfissionalUpdateManyWithoutTenantNestedInput
    usuarios?: UsuarioUpdateManyWithoutTenantNestedInput
    whatsappConfig?: WhatsAppConfigUpdateOneWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutProcedimentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUncheckedUpdateManyWithoutTenantNestedInput
    atendimentos?: AtendimentoUncheckedUpdateManyWithoutTenantNestedInput
    pacientes?: PacienteUncheckedUpdateManyWithoutTenantNestedInput
    profissionais?: ProfissionalUncheckedUpdateManyWithoutTenantNestedInput
    usuarios?: UsuarioUncheckedUpdateManyWithoutTenantNestedInput
    whatsappConfig?: WhatsAppConfigUncheckedUpdateOneWithoutTenantNestedInput
  }

  export type PacienteCreateWithoutAgendamentosInput = {
    id?: string
    nome: string
    telefone: string
    email?: string | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    atendimentos?: AtendimentoCreateNestedManyWithoutPacienteInput
    profissional?: ProfissionalCreateNestedOneWithoutPacientesInput
    tenant: TenantCreateNestedOneWithoutPacientesInput
  }

  export type PacienteUncheckedCreateWithoutAgendamentosInput = {
    id?: string
    tenantId: string
    profissionalId?: string | null
    nome: string
    telefone: string
    email?: string | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    atendimentos?: AtendimentoUncheckedCreateNestedManyWithoutPacienteInput
  }

  export type PacienteCreateOrConnectWithoutAgendamentosInput = {
    where: PacienteWhereUniqueInput
    create: XOR<PacienteCreateWithoutAgendamentosInput, PacienteUncheckedCreateWithoutAgendamentosInput>
  }

  export type ProcedimentoCreateWithoutAgendamentosInput = {
    id?: string
    nome: string
    valor?: Decimal | DecimalJsLike | number | string | null
    duracaoMinutos: number
    createdAt?: Date | string
    updatedAt?: Date | string
    atendimentos?: AtendimentoCreateNestedManyWithoutProcedimentoInput
    tenant: TenantCreateNestedOneWithoutProcedimentosInput
  }

  export type ProcedimentoUncheckedCreateWithoutAgendamentosInput = {
    id?: string
    tenantId: string
    nome: string
    valor?: Decimal | DecimalJsLike | number | string | null
    duracaoMinutos: number
    createdAt?: Date | string
    updatedAt?: Date | string
    atendimentos?: AtendimentoUncheckedCreateNestedManyWithoutProcedimentoInput
  }

  export type ProcedimentoCreateOrConnectWithoutAgendamentosInput = {
    where: ProcedimentoWhereUniqueInput
    create: XOR<ProcedimentoCreateWithoutAgendamentosInput, ProcedimentoUncheckedCreateWithoutAgendamentosInput>
  }

  export type ProfissionalCreateWithoutAgendamentosInput = {
    id?: string
    nome: string
    especialidade?: string | null
    observacoes?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    atendimentos?: AtendimentoCreateNestedManyWithoutProfissionalInput
    pacientes?: PacienteCreateNestedManyWithoutProfissionalInput
    tenant: TenantCreateNestedOneWithoutProfissionaisInput
  }

  export type ProfissionalUncheckedCreateWithoutAgendamentosInput = {
    id?: string
    tenantId: string
    nome: string
    especialidade?: string | null
    observacoes?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    atendimentos?: AtendimentoUncheckedCreateNestedManyWithoutProfissionalInput
    pacientes?: PacienteUncheckedCreateNestedManyWithoutProfissionalInput
  }

  export type ProfissionalCreateOrConnectWithoutAgendamentosInput = {
    where: ProfissionalWhereUniqueInput
    create: XOR<ProfissionalCreateWithoutAgendamentosInput, ProfissionalUncheckedCreateWithoutAgendamentosInput>
  }

  export type TenantCreateWithoutAgendamentosInput = {
    id?: string
    nome: string
    plano?: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    atendimentos?: AtendimentoCreateNestedManyWithoutTenantInput
    pacientes?: PacienteCreateNestedManyWithoutTenantInput
    procedimentos?: ProcedimentoCreateNestedManyWithoutTenantInput
    profissionais?: ProfissionalCreateNestedManyWithoutTenantInput
    usuarios?: UsuarioCreateNestedManyWithoutTenantInput
    whatsappConfig?: WhatsAppConfigCreateNestedOneWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutAgendamentosInput = {
    id?: string
    nome: string
    plano?: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    atendimentos?: AtendimentoUncheckedCreateNestedManyWithoutTenantInput
    pacientes?: PacienteUncheckedCreateNestedManyWithoutTenantInput
    procedimentos?: ProcedimentoUncheckedCreateNestedManyWithoutTenantInput
    profissionais?: ProfissionalUncheckedCreateNestedManyWithoutTenantInput
    usuarios?: UsuarioUncheckedCreateNestedManyWithoutTenantInput
    whatsappConfig?: WhatsAppConfigUncheckedCreateNestedOneWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutAgendamentosInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutAgendamentosInput, TenantUncheckedCreateWithoutAgendamentosInput>
  }

  export type AtendimentoCreateWithoutAgendamentoInput = {
    id?: string
    anotacoes?: string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    paciente: PacienteCreateNestedOneWithoutAtendimentosInput
    procedimento: ProcedimentoCreateNestedOneWithoutAtendimentosInput
    profissional: ProfissionalCreateNestedOneWithoutAtendimentosInput
    tenant: TenantCreateNestedOneWithoutAtendimentosInput
  }

  export type AtendimentoUncheckedCreateWithoutAgendamentoInput = {
    id?: string
    tenantId: string
    pacienteId: string
    profissionalId: string
    procedimentoId: string
    anotacoes?: string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AtendimentoCreateOrConnectWithoutAgendamentoInput = {
    where: AtendimentoWhereUniqueInput
    create: XOR<AtendimentoCreateWithoutAgendamentoInput, AtendimentoUncheckedCreateWithoutAgendamentoInput>
  }

  export type PacienteUpsertWithoutAgendamentosInput = {
    update: XOR<PacienteUpdateWithoutAgendamentosInput, PacienteUncheckedUpdateWithoutAgendamentosInput>
    create: XOR<PacienteCreateWithoutAgendamentosInput, PacienteUncheckedCreateWithoutAgendamentosInput>
    where?: PacienteWhereInput
  }

  export type PacienteUpdateToOneWithWhereWithoutAgendamentosInput = {
    where?: PacienteWhereInput
    data: XOR<PacienteUpdateWithoutAgendamentosInput, PacienteUncheckedUpdateWithoutAgendamentosInput>
  }

  export type PacienteUpdateWithoutAgendamentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    atendimentos?: AtendimentoUpdateManyWithoutPacienteNestedInput
    profissional?: ProfissionalUpdateOneWithoutPacientesNestedInput
    tenant?: TenantUpdateOneRequiredWithoutPacientesNestedInput
  }

  export type PacienteUncheckedUpdateWithoutAgendamentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    profissionalId?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    atendimentos?: AtendimentoUncheckedUpdateManyWithoutPacienteNestedInput
  }

  export type ProcedimentoUpsertWithoutAgendamentosInput = {
    update: XOR<ProcedimentoUpdateWithoutAgendamentosInput, ProcedimentoUncheckedUpdateWithoutAgendamentosInput>
    create: XOR<ProcedimentoCreateWithoutAgendamentosInput, ProcedimentoUncheckedCreateWithoutAgendamentosInput>
    where?: ProcedimentoWhereInput
  }

  export type ProcedimentoUpdateToOneWithWhereWithoutAgendamentosInput = {
    where?: ProcedimentoWhereInput
    data: XOR<ProcedimentoUpdateWithoutAgendamentosInput, ProcedimentoUncheckedUpdateWithoutAgendamentosInput>
  }

  export type ProcedimentoUpdateWithoutAgendamentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    valor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    duracaoMinutos?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    atendimentos?: AtendimentoUpdateManyWithoutProcedimentoNestedInput
    tenant?: TenantUpdateOneRequiredWithoutProcedimentosNestedInput
  }

  export type ProcedimentoUncheckedUpdateWithoutAgendamentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    valor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    duracaoMinutos?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    atendimentos?: AtendimentoUncheckedUpdateManyWithoutProcedimentoNestedInput
  }

  export type ProfissionalUpsertWithoutAgendamentosInput = {
    update: XOR<ProfissionalUpdateWithoutAgendamentosInput, ProfissionalUncheckedUpdateWithoutAgendamentosInput>
    create: XOR<ProfissionalCreateWithoutAgendamentosInput, ProfissionalUncheckedCreateWithoutAgendamentosInput>
    where?: ProfissionalWhereInput
  }

  export type ProfissionalUpdateToOneWithWhereWithoutAgendamentosInput = {
    where?: ProfissionalWhereInput
    data: XOR<ProfissionalUpdateWithoutAgendamentosInput, ProfissionalUncheckedUpdateWithoutAgendamentosInput>
  }

  export type ProfissionalUpdateWithoutAgendamentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    especialidade?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    atendimentos?: AtendimentoUpdateManyWithoutProfissionalNestedInput
    pacientes?: PacienteUpdateManyWithoutProfissionalNestedInput
    tenant?: TenantUpdateOneRequiredWithoutProfissionaisNestedInput
  }

  export type ProfissionalUncheckedUpdateWithoutAgendamentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    especialidade?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    atendimentos?: AtendimentoUncheckedUpdateManyWithoutProfissionalNestedInput
    pacientes?: PacienteUncheckedUpdateManyWithoutProfissionalNestedInput
  }

  export type TenantUpsertWithoutAgendamentosInput = {
    update: XOR<TenantUpdateWithoutAgendamentosInput, TenantUncheckedUpdateWithoutAgendamentosInput>
    create: XOR<TenantCreateWithoutAgendamentosInput, TenantUncheckedCreateWithoutAgendamentosInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutAgendamentosInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutAgendamentosInput, TenantUncheckedUpdateWithoutAgendamentosInput>
  }

  export type TenantUpdateWithoutAgendamentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    atendimentos?: AtendimentoUpdateManyWithoutTenantNestedInput
    pacientes?: PacienteUpdateManyWithoutTenantNestedInput
    procedimentos?: ProcedimentoUpdateManyWithoutTenantNestedInput
    profissionais?: ProfissionalUpdateManyWithoutTenantNestedInput
    usuarios?: UsuarioUpdateManyWithoutTenantNestedInput
    whatsappConfig?: WhatsAppConfigUpdateOneWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutAgendamentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    atendimentos?: AtendimentoUncheckedUpdateManyWithoutTenantNestedInput
    pacientes?: PacienteUncheckedUpdateManyWithoutTenantNestedInput
    procedimentos?: ProcedimentoUncheckedUpdateManyWithoutTenantNestedInput
    profissionais?: ProfissionalUncheckedUpdateManyWithoutTenantNestedInput
    usuarios?: UsuarioUncheckedUpdateManyWithoutTenantNestedInput
    whatsappConfig?: WhatsAppConfigUncheckedUpdateOneWithoutTenantNestedInput
  }

  export type AtendimentoUpsertWithoutAgendamentoInput = {
    update: XOR<AtendimentoUpdateWithoutAgendamentoInput, AtendimentoUncheckedUpdateWithoutAgendamentoInput>
    create: XOR<AtendimentoCreateWithoutAgendamentoInput, AtendimentoUncheckedCreateWithoutAgendamentoInput>
    where?: AtendimentoWhereInput
  }

  export type AtendimentoUpdateToOneWithWhereWithoutAgendamentoInput = {
    where?: AtendimentoWhereInput
    data: XOR<AtendimentoUpdateWithoutAgendamentoInput, AtendimentoUncheckedUpdateWithoutAgendamentoInput>
  }

  export type AtendimentoUpdateWithoutAgendamentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    anotacoes?: NullableStringFieldUpdateOperationsInput | string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paciente?: PacienteUpdateOneRequiredWithoutAtendimentosNestedInput
    procedimento?: ProcedimentoUpdateOneRequiredWithoutAtendimentosNestedInput
    profissional?: ProfissionalUpdateOneRequiredWithoutAtendimentosNestedInput
    tenant?: TenantUpdateOneRequiredWithoutAtendimentosNestedInput
  }

  export type AtendimentoUncheckedUpdateWithoutAgendamentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    pacienteId?: StringFieldUpdateOperationsInput | string
    profissionalId?: StringFieldUpdateOperationsInput | string
    procedimentoId?: StringFieldUpdateOperationsInput | string
    anotacoes?: NullableStringFieldUpdateOperationsInput | string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgendamentoCreateWithoutAtendimentoInput = {
    id?: string
    dataHora: Date | string
    status?: $Enums.StatusAgendamento
    observacoes?: string | null
    confirmacaoEnviada?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dataHoraFim: Date | string
    paciente?: PacienteCreateNestedOneWithoutAgendamentosInput
    procedimento: ProcedimentoCreateNestedOneWithoutAgendamentosInput
    profissional: ProfissionalCreateNestedOneWithoutAgendamentosInput
    tenant: TenantCreateNestedOneWithoutAgendamentosInput
  }

  export type AgendamentoUncheckedCreateWithoutAtendimentoInput = {
    id?: string
    tenantId: string
    pacienteId?: string | null
    profissionalId: string
    procedimentoId: string
    dataHora: Date | string
    status?: $Enums.StatusAgendamento
    observacoes?: string | null
    confirmacaoEnviada?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dataHoraFim: Date | string
  }

  export type AgendamentoCreateOrConnectWithoutAtendimentoInput = {
    where: AgendamentoWhereUniqueInput
    create: XOR<AgendamentoCreateWithoutAtendimentoInput, AgendamentoUncheckedCreateWithoutAtendimentoInput>
  }

  export type PacienteCreateWithoutAtendimentosInput = {
    id?: string
    nome: string
    telefone: string
    email?: string | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoCreateNestedManyWithoutPacienteInput
    profissional?: ProfissionalCreateNestedOneWithoutPacientesInput
    tenant: TenantCreateNestedOneWithoutPacientesInput
  }

  export type PacienteUncheckedCreateWithoutAtendimentosInput = {
    id?: string
    tenantId: string
    profissionalId?: string | null
    nome: string
    telefone: string
    email?: string | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoUncheckedCreateNestedManyWithoutPacienteInput
  }

  export type PacienteCreateOrConnectWithoutAtendimentosInput = {
    where: PacienteWhereUniqueInput
    create: XOR<PacienteCreateWithoutAtendimentosInput, PacienteUncheckedCreateWithoutAtendimentosInput>
  }

  export type ProcedimentoCreateWithoutAtendimentosInput = {
    id?: string
    nome: string
    valor?: Decimal | DecimalJsLike | number | string | null
    duracaoMinutos: number
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoCreateNestedManyWithoutProcedimentoInput
    tenant: TenantCreateNestedOneWithoutProcedimentosInput
  }

  export type ProcedimentoUncheckedCreateWithoutAtendimentosInput = {
    id?: string
    tenantId: string
    nome: string
    valor?: Decimal | DecimalJsLike | number | string | null
    duracaoMinutos: number
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoUncheckedCreateNestedManyWithoutProcedimentoInput
  }

  export type ProcedimentoCreateOrConnectWithoutAtendimentosInput = {
    where: ProcedimentoWhereUniqueInput
    create: XOR<ProcedimentoCreateWithoutAtendimentosInput, ProcedimentoUncheckedCreateWithoutAtendimentosInput>
  }

  export type ProfissionalCreateWithoutAtendimentosInput = {
    id?: string
    nome: string
    especialidade?: string | null
    observacoes?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoCreateNestedManyWithoutProfissionalInput
    pacientes?: PacienteCreateNestedManyWithoutProfissionalInput
    tenant: TenantCreateNestedOneWithoutProfissionaisInput
  }

  export type ProfissionalUncheckedCreateWithoutAtendimentosInput = {
    id?: string
    tenantId: string
    nome: string
    especialidade?: string | null
    observacoes?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoUncheckedCreateNestedManyWithoutProfissionalInput
    pacientes?: PacienteUncheckedCreateNestedManyWithoutProfissionalInput
  }

  export type ProfissionalCreateOrConnectWithoutAtendimentosInput = {
    where: ProfissionalWhereUniqueInput
    create: XOR<ProfissionalCreateWithoutAtendimentosInput, ProfissionalUncheckedCreateWithoutAtendimentosInput>
  }

  export type TenantCreateWithoutAtendimentosInput = {
    id?: string
    nome: string
    plano?: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoCreateNestedManyWithoutTenantInput
    pacientes?: PacienteCreateNestedManyWithoutTenantInput
    procedimentos?: ProcedimentoCreateNestedManyWithoutTenantInput
    profissionais?: ProfissionalCreateNestedManyWithoutTenantInput
    usuarios?: UsuarioCreateNestedManyWithoutTenantInput
    whatsappConfig?: WhatsAppConfigCreateNestedOneWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutAtendimentosInput = {
    id?: string
    nome: string
    plano?: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoUncheckedCreateNestedManyWithoutTenantInput
    pacientes?: PacienteUncheckedCreateNestedManyWithoutTenantInput
    procedimentos?: ProcedimentoUncheckedCreateNestedManyWithoutTenantInput
    profissionais?: ProfissionalUncheckedCreateNestedManyWithoutTenantInput
    usuarios?: UsuarioUncheckedCreateNestedManyWithoutTenantInput
    whatsappConfig?: WhatsAppConfigUncheckedCreateNestedOneWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutAtendimentosInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutAtendimentosInput, TenantUncheckedCreateWithoutAtendimentosInput>
  }

  export type AgendamentoUpsertWithoutAtendimentoInput = {
    update: XOR<AgendamentoUpdateWithoutAtendimentoInput, AgendamentoUncheckedUpdateWithoutAtendimentoInput>
    create: XOR<AgendamentoCreateWithoutAtendimentoInput, AgendamentoUncheckedCreateWithoutAtendimentoInput>
    where?: AgendamentoWhereInput
  }

  export type AgendamentoUpdateToOneWithWhereWithoutAtendimentoInput = {
    where?: AgendamentoWhereInput
    data: XOR<AgendamentoUpdateWithoutAtendimentoInput, AgendamentoUncheckedUpdateWithoutAtendimentoInput>
  }

  export type AgendamentoUpdateWithoutAtendimentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    dataHora?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusAgendamentoFieldUpdateOperationsInput | $Enums.StatusAgendamento
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    confirmacaoEnviada?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataHoraFim?: DateTimeFieldUpdateOperationsInput | Date | string
    paciente?: PacienteUpdateOneWithoutAgendamentosNestedInput
    procedimento?: ProcedimentoUpdateOneRequiredWithoutAgendamentosNestedInput
    profissional?: ProfissionalUpdateOneRequiredWithoutAgendamentosNestedInput
    tenant?: TenantUpdateOneRequiredWithoutAgendamentosNestedInput
  }

  export type AgendamentoUncheckedUpdateWithoutAtendimentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    pacienteId?: NullableStringFieldUpdateOperationsInput | string | null
    profissionalId?: StringFieldUpdateOperationsInput | string
    procedimentoId?: StringFieldUpdateOperationsInput | string
    dataHora?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusAgendamentoFieldUpdateOperationsInput | $Enums.StatusAgendamento
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    confirmacaoEnviada?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataHoraFim?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PacienteUpsertWithoutAtendimentosInput = {
    update: XOR<PacienteUpdateWithoutAtendimentosInput, PacienteUncheckedUpdateWithoutAtendimentosInput>
    create: XOR<PacienteCreateWithoutAtendimentosInput, PacienteUncheckedCreateWithoutAtendimentosInput>
    where?: PacienteWhereInput
  }

  export type PacienteUpdateToOneWithWhereWithoutAtendimentosInput = {
    where?: PacienteWhereInput
    data: XOR<PacienteUpdateWithoutAtendimentosInput, PacienteUncheckedUpdateWithoutAtendimentosInput>
  }

  export type PacienteUpdateWithoutAtendimentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUpdateManyWithoutPacienteNestedInput
    profissional?: ProfissionalUpdateOneWithoutPacientesNestedInput
    tenant?: TenantUpdateOneRequiredWithoutPacientesNestedInput
  }

  export type PacienteUncheckedUpdateWithoutAtendimentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    profissionalId?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUncheckedUpdateManyWithoutPacienteNestedInput
  }

  export type ProcedimentoUpsertWithoutAtendimentosInput = {
    update: XOR<ProcedimentoUpdateWithoutAtendimentosInput, ProcedimentoUncheckedUpdateWithoutAtendimentosInput>
    create: XOR<ProcedimentoCreateWithoutAtendimentosInput, ProcedimentoUncheckedCreateWithoutAtendimentosInput>
    where?: ProcedimentoWhereInput
  }

  export type ProcedimentoUpdateToOneWithWhereWithoutAtendimentosInput = {
    where?: ProcedimentoWhereInput
    data: XOR<ProcedimentoUpdateWithoutAtendimentosInput, ProcedimentoUncheckedUpdateWithoutAtendimentosInput>
  }

  export type ProcedimentoUpdateWithoutAtendimentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    valor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    duracaoMinutos?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUpdateManyWithoutProcedimentoNestedInput
    tenant?: TenantUpdateOneRequiredWithoutProcedimentosNestedInput
  }

  export type ProcedimentoUncheckedUpdateWithoutAtendimentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    valor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    duracaoMinutos?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUncheckedUpdateManyWithoutProcedimentoNestedInput
  }

  export type ProfissionalUpsertWithoutAtendimentosInput = {
    update: XOR<ProfissionalUpdateWithoutAtendimentosInput, ProfissionalUncheckedUpdateWithoutAtendimentosInput>
    create: XOR<ProfissionalCreateWithoutAtendimentosInput, ProfissionalUncheckedCreateWithoutAtendimentosInput>
    where?: ProfissionalWhereInput
  }

  export type ProfissionalUpdateToOneWithWhereWithoutAtendimentosInput = {
    where?: ProfissionalWhereInput
    data: XOR<ProfissionalUpdateWithoutAtendimentosInput, ProfissionalUncheckedUpdateWithoutAtendimentosInput>
  }

  export type ProfissionalUpdateWithoutAtendimentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    especialidade?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUpdateManyWithoutProfissionalNestedInput
    pacientes?: PacienteUpdateManyWithoutProfissionalNestedInput
    tenant?: TenantUpdateOneRequiredWithoutProfissionaisNestedInput
  }

  export type ProfissionalUncheckedUpdateWithoutAtendimentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    especialidade?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUncheckedUpdateManyWithoutProfissionalNestedInput
    pacientes?: PacienteUncheckedUpdateManyWithoutProfissionalNestedInput
  }

  export type TenantUpsertWithoutAtendimentosInput = {
    update: XOR<TenantUpdateWithoutAtendimentosInput, TenantUncheckedUpdateWithoutAtendimentosInput>
    create: XOR<TenantCreateWithoutAtendimentosInput, TenantUncheckedCreateWithoutAtendimentosInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutAtendimentosInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutAtendimentosInput, TenantUncheckedUpdateWithoutAtendimentosInput>
  }

  export type TenantUpdateWithoutAtendimentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUpdateManyWithoutTenantNestedInput
    pacientes?: PacienteUpdateManyWithoutTenantNestedInput
    procedimentos?: ProcedimentoUpdateManyWithoutTenantNestedInput
    profissionais?: ProfissionalUpdateManyWithoutTenantNestedInput
    usuarios?: UsuarioUpdateManyWithoutTenantNestedInput
    whatsappConfig?: WhatsAppConfigUpdateOneWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutAtendimentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUncheckedUpdateManyWithoutTenantNestedInput
    pacientes?: PacienteUncheckedUpdateManyWithoutTenantNestedInput
    procedimentos?: ProcedimentoUncheckedUpdateManyWithoutTenantNestedInput
    profissionais?: ProfissionalUncheckedUpdateManyWithoutTenantNestedInput
    usuarios?: UsuarioUncheckedUpdateManyWithoutTenantNestedInput
    whatsappConfig?: WhatsAppConfigUncheckedUpdateOneWithoutTenantNestedInput
  }

  export type TenantCreateWithoutWhatsappConfigInput = {
    id?: string
    nome: string
    plano?: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoCreateNestedManyWithoutTenantInput
    atendimentos?: AtendimentoCreateNestedManyWithoutTenantInput
    pacientes?: PacienteCreateNestedManyWithoutTenantInput
    procedimentos?: ProcedimentoCreateNestedManyWithoutTenantInput
    profissionais?: ProfissionalCreateNestedManyWithoutTenantInput
    usuarios?: UsuarioCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutWhatsappConfigInput = {
    id?: string
    nome: string
    plano?: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    agendamentos?: AgendamentoUncheckedCreateNestedManyWithoutTenantInput
    atendimentos?: AtendimentoUncheckedCreateNestedManyWithoutTenantInput
    pacientes?: PacienteUncheckedCreateNestedManyWithoutTenantInput
    procedimentos?: ProcedimentoUncheckedCreateNestedManyWithoutTenantInput
    profissionais?: ProfissionalUncheckedCreateNestedManyWithoutTenantInput
    usuarios?: UsuarioUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutWhatsappConfigInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutWhatsappConfigInput, TenantUncheckedCreateWithoutWhatsappConfigInput>
  }

  export type TenantUpsertWithoutWhatsappConfigInput = {
    update: XOR<TenantUpdateWithoutWhatsappConfigInput, TenantUncheckedUpdateWithoutWhatsappConfigInput>
    create: XOR<TenantCreateWithoutWhatsappConfigInput, TenantUncheckedCreateWithoutWhatsappConfigInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutWhatsappConfigInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutWhatsappConfigInput, TenantUncheckedUpdateWithoutWhatsappConfigInput>
  }

  export type TenantUpdateWithoutWhatsappConfigInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUpdateManyWithoutTenantNestedInput
    atendimentos?: AtendimentoUpdateManyWithoutTenantNestedInput
    pacientes?: PacienteUpdateManyWithoutTenantNestedInput
    procedimentos?: ProcedimentoUpdateManyWithoutTenantNestedInput
    profissionais?: ProfissionalUpdateManyWithoutTenantNestedInput
    usuarios?: UsuarioUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutWhatsappConfigInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    plano?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUncheckedUpdateManyWithoutTenantNestedInput
    atendimentos?: AtendimentoUncheckedUpdateManyWithoutTenantNestedInput
    pacientes?: PacienteUncheckedUpdateManyWithoutTenantNestedInput
    procedimentos?: ProcedimentoUncheckedUpdateManyWithoutTenantNestedInput
    profissionais?: ProfissionalUncheckedUpdateManyWithoutTenantNestedInput
    usuarios?: UsuarioUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type AgendamentoCreateManyTenantInput = {
    id?: string
    pacienteId?: string | null
    profissionalId: string
    procedimentoId: string
    dataHora: Date | string
    status?: $Enums.StatusAgendamento
    observacoes?: string | null
    confirmacaoEnviada?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dataHoraFim: Date | string
  }

  export type AtendimentoCreateManyTenantInput = {
    id?: string
    agendamentoId: string
    pacienteId: string
    profissionalId: string
    procedimentoId: string
    anotacoes?: string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PacienteCreateManyTenantInput = {
    id?: string
    profissionalId?: string | null
    nome: string
    telefone: string
    email?: string | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProcedimentoCreateManyTenantInput = {
    id?: string
    nome: string
    valor?: Decimal | DecimalJsLike | number | string | null
    duracaoMinutos: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfissionalCreateManyTenantInput = {
    id?: string
    nome: string
    especialidade?: string | null
    observacoes?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsuarioCreateManyTenantInput = {
    id?: string
    nome: string
    email: string
    senha: string
    tipo?: $Enums.TipoUsuario
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgendamentoUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    dataHora?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusAgendamentoFieldUpdateOperationsInput | $Enums.StatusAgendamento
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    confirmacaoEnviada?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataHoraFim?: DateTimeFieldUpdateOperationsInput | Date | string
    paciente?: PacienteUpdateOneWithoutAgendamentosNestedInput
    procedimento?: ProcedimentoUpdateOneRequiredWithoutAgendamentosNestedInput
    profissional?: ProfissionalUpdateOneRequiredWithoutAgendamentosNestedInput
    atendimento?: AtendimentoUpdateOneWithoutAgendamentoNestedInput
  }

  export type AgendamentoUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    pacienteId?: NullableStringFieldUpdateOperationsInput | string | null
    profissionalId?: StringFieldUpdateOperationsInput | string
    procedimentoId?: StringFieldUpdateOperationsInput | string
    dataHora?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusAgendamentoFieldUpdateOperationsInput | $Enums.StatusAgendamento
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    confirmacaoEnviada?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataHoraFim?: DateTimeFieldUpdateOperationsInput | Date | string
    atendimento?: AtendimentoUncheckedUpdateOneWithoutAgendamentoNestedInput
  }

  export type AgendamentoUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    pacienteId?: NullableStringFieldUpdateOperationsInput | string | null
    profissionalId?: StringFieldUpdateOperationsInput | string
    procedimentoId?: StringFieldUpdateOperationsInput | string
    dataHora?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusAgendamentoFieldUpdateOperationsInput | $Enums.StatusAgendamento
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    confirmacaoEnviada?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataHoraFim?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AtendimentoUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    anotacoes?: NullableStringFieldUpdateOperationsInput | string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamento?: AgendamentoUpdateOneRequiredWithoutAtendimentoNestedInput
    paciente?: PacienteUpdateOneRequiredWithoutAtendimentosNestedInput
    procedimento?: ProcedimentoUpdateOneRequiredWithoutAtendimentosNestedInput
    profissional?: ProfissionalUpdateOneRequiredWithoutAtendimentosNestedInput
  }

  export type AtendimentoUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    agendamentoId?: StringFieldUpdateOperationsInput | string
    pacienteId?: StringFieldUpdateOperationsInput | string
    profissionalId?: StringFieldUpdateOperationsInput | string
    procedimentoId?: StringFieldUpdateOperationsInput | string
    anotacoes?: NullableStringFieldUpdateOperationsInput | string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AtendimentoUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    agendamentoId?: StringFieldUpdateOperationsInput | string
    pacienteId?: StringFieldUpdateOperationsInput | string
    profissionalId?: StringFieldUpdateOperationsInput | string
    procedimentoId?: StringFieldUpdateOperationsInput | string
    anotacoes?: NullableStringFieldUpdateOperationsInput | string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PacienteUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUpdateManyWithoutPacienteNestedInput
    atendimentos?: AtendimentoUpdateManyWithoutPacienteNestedInput
    profissional?: ProfissionalUpdateOneWithoutPacientesNestedInput
  }

  export type PacienteUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    profissionalId?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUncheckedUpdateManyWithoutPacienteNestedInput
    atendimentos?: AtendimentoUncheckedUpdateManyWithoutPacienteNestedInput
  }

  export type PacienteUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    profissionalId?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcedimentoUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    valor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    duracaoMinutos?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUpdateManyWithoutProcedimentoNestedInput
    atendimentos?: AtendimentoUpdateManyWithoutProcedimentoNestedInput
  }

  export type ProcedimentoUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    valor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    duracaoMinutos?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUncheckedUpdateManyWithoutProcedimentoNestedInput
    atendimentos?: AtendimentoUncheckedUpdateManyWithoutProcedimentoNestedInput
  }

  export type ProcedimentoUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    valor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    duracaoMinutos?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfissionalUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    especialidade?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUpdateManyWithoutProfissionalNestedInput
    atendimentos?: AtendimentoUpdateManyWithoutProfissionalNestedInput
    pacientes?: PacienteUpdateManyWithoutProfissionalNestedInput
  }

  export type ProfissionalUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    especialidade?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUncheckedUpdateManyWithoutProfissionalNestedInput
    atendimentos?: AtendimentoUncheckedUpdateManyWithoutProfissionalNestedInput
    pacientes?: PacienteUncheckedUpdateManyWithoutProfissionalNestedInput
  }

  export type ProfissionalUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    especialidade?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgendamentoCreateManyProfissionalInput = {
    id?: string
    tenantId: string
    pacienteId?: string | null
    procedimentoId: string
    dataHora: Date | string
    status?: $Enums.StatusAgendamento
    observacoes?: string | null
    confirmacaoEnviada?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dataHoraFim: Date | string
  }

  export type AtendimentoCreateManyProfissionalInput = {
    id?: string
    tenantId: string
    agendamentoId: string
    pacienteId: string
    procedimentoId: string
    anotacoes?: string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PacienteCreateManyProfissionalInput = {
    id?: string
    tenantId: string
    nome: string
    telefone: string
    email?: string | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgendamentoUpdateWithoutProfissionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    dataHora?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusAgendamentoFieldUpdateOperationsInput | $Enums.StatusAgendamento
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    confirmacaoEnviada?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataHoraFim?: DateTimeFieldUpdateOperationsInput | Date | string
    paciente?: PacienteUpdateOneWithoutAgendamentosNestedInput
    procedimento?: ProcedimentoUpdateOneRequiredWithoutAgendamentosNestedInput
    tenant?: TenantUpdateOneRequiredWithoutAgendamentosNestedInput
    atendimento?: AtendimentoUpdateOneWithoutAgendamentoNestedInput
  }

  export type AgendamentoUncheckedUpdateWithoutProfissionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    pacienteId?: NullableStringFieldUpdateOperationsInput | string | null
    procedimentoId?: StringFieldUpdateOperationsInput | string
    dataHora?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusAgendamentoFieldUpdateOperationsInput | $Enums.StatusAgendamento
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    confirmacaoEnviada?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataHoraFim?: DateTimeFieldUpdateOperationsInput | Date | string
    atendimento?: AtendimentoUncheckedUpdateOneWithoutAgendamentoNestedInput
  }

  export type AgendamentoUncheckedUpdateManyWithoutProfissionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    pacienteId?: NullableStringFieldUpdateOperationsInput | string | null
    procedimentoId?: StringFieldUpdateOperationsInput | string
    dataHora?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusAgendamentoFieldUpdateOperationsInput | $Enums.StatusAgendamento
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    confirmacaoEnviada?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataHoraFim?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AtendimentoUpdateWithoutProfissionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    anotacoes?: NullableStringFieldUpdateOperationsInput | string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamento?: AgendamentoUpdateOneRequiredWithoutAtendimentoNestedInput
    paciente?: PacienteUpdateOneRequiredWithoutAtendimentosNestedInput
    procedimento?: ProcedimentoUpdateOneRequiredWithoutAtendimentosNestedInput
    tenant?: TenantUpdateOneRequiredWithoutAtendimentosNestedInput
  }

  export type AtendimentoUncheckedUpdateWithoutProfissionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    agendamentoId?: StringFieldUpdateOperationsInput | string
    pacienteId?: StringFieldUpdateOperationsInput | string
    procedimentoId?: StringFieldUpdateOperationsInput | string
    anotacoes?: NullableStringFieldUpdateOperationsInput | string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AtendimentoUncheckedUpdateManyWithoutProfissionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    agendamentoId?: StringFieldUpdateOperationsInput | string
    pacienteId?: StringFieldUpdateOperationsInput | string
    procedimentoId?: StringFieldUpdateOperationsInput | string
    anotacoes?: NullableStringFieldUpdateOperationsInput | string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PacienteUpdateWithoutProfissionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUpdateManyWithoutPacienteNestedInput
    atendimentos?: AtendimentoUpdateManyWithoutPacienteNestedInput
    tenant?: TenantUpdateOneRequiredWithoutPacientesNestedInput
  }

  export type PacienteUncheckedUpdateWithoutProfissionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentoUncheckedUpdateManyWithoutPacienteNestedInput
    atendimentos?: AtendimentoUncheckedUpdateManyWithoutPacienteNestedInput
  }

  export type PacienteUncheckedUpdateManyWithoutProfissionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgendamentoCreateManyPacienteInput = {
    id?: string
    tenantId: string
    profissionalId: string
    procedimentoId: string
    dataHora: Date | string
    status?: $Enums.StatusAgendamento
    observacoes?: string | null
    confirmacaoEnviada?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dataHoraFim: Date | string
  }

  export type AtendimentoCreateManyPacienteInput = {
    id?: string
    tenantId: string
    agendamentoId: string
    profissionalId: string
    procedimentoId: string
    anotacoes?: string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgendamentoUpdateWithoutPacienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    dataHora?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusAgendamentoFieldUpdateOperationsInput | $Enums.StatusAgendamento
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    confirmacaoEnviada?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataHoraFim?: DateTimeFieldUpdateOperationsInput | Date | string
    procedimento?: ProcedimentoUpdateOneRequiredWithoutAgendamentosNestedInput
    profissional?: ProfissionalUpdateOneRequiredWithoutAgendamentosNestedInput
    tenant?: TenantUpdateOneRequiredWithoutAgendamentosNestedInput
    atendimento?: AtendimentoUpdateOneWithoutAgendamentoNestedInput
  }

  export type AgendamentoUncheckedUpdateWithoutPacienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    profissionalId?: StringFieldUpdateOperationsInput | string
    procedimentoId?: StringFieldUpdateOperationsInput | string
    dataHora?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusAgendamentoFieldUpdateOperationsInput | $Enums.StatusAgendamento
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    confirmacaoEnviada?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataHoraFim?: DateTimeFieldUpdateOperationsInput | Date | string
    atendimento?: AtendimentoUncheckedUpdateOneWithoutAgendamentoNestedInput
  }

  export type AgendamentoUncheckedUpdateManyWithoutPacienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    profissionalId?: StringFieldUpdateOperationsInput | string
    procedimentoId?: StringFieldUpdateOperationsInput | string
    dataHora?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusAgendamentoFieldUpdateOperationsInput | $Enums.StatusAgendamento
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    confirmacaoEnviada?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataHoraFim?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AtendimentoUpdateWithoutPacienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    anotacoes?: NullableStringFieldUpdateOperationsInput | string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamento?: AgendamentoUpdateOneRequiredWithoutAtendimentoNestedInput
    procedimento?: ProcedimentoUpdateOneRequiredWithoutAtendimentosNestedInput
    profissional?: ProfissionalUpdateOneRequiredWithoutAtendimentosNestedInput
    tenant?: TenantUpdateOneRequiredWithoutAtendimentosNestedInput
  }

  export type AtendimentoUncheckedUpdateWithoutPacienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    agendamentoId?: StringFieldUpdateOperationsInput | string
    profissionalId?: StringFieldUpdateOperationsInput | string
    procedimentoId?: StringFieldUpdateOperationsInput | string
    anotacoes?: NullableStringFieldUpdateOperationsInput | string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AtendimentoUncheckedUpdateManyWithoutPacienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    agendamentoId?: StringFieldUpdateOperationsInput | string
    profissionalId?: StringFieldUpdateOperationsInput | string
    procedimentoId?: StringFieldUpdateOperationsInput | string
    anotacoes?: NullableStringFieldUpdateOperationsInput | string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgendamentoCreateManyProcedimentoInput = {
    id?: string
    tenantId: string
    pacienteId?: string | null
    profissionalId: string
    dataHora: Date | string
    status?: $Enums.StatusAgendamento
    observacoes?: string | null
    confirmacaoEnviada?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dataHoraFim: Date | string
  }

  export type AtendimentoCreateManyProcedimentoInput = {
    id?: string
    tenantId: string
    agendamentoId: string
    pacienteId: string
    profissionalId: string
    anotacoes?: string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgendamentoUpdateWithoutProcedimentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    dataHora?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusAgendamentoFieldUpdateOperationsInput | $Enums.StatusAgendamento
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    confirmacaoEnviada?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataHoraFim?: DateTimeFieldUpdateOperationsInput | Date | string
    paciente?: PacienteUpdateOneWithoutAgendamentosNestedInput
    profissional?: ProfissionalUpdateOneRequiredWithoutAgendamentosNestedInput
    tenant?: TenantUpdateOneRequiredWithoutAgendamentosNestedInput
    atendimento?: AtendimentoUpdateOneWithoutAgendamentoNestedInput
  }

  export type AgendamentoUncheckedUpdateWithoutProcedimentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    pacienteId?: NullableStringFieldUpdateOperationsInput | string | null
    profissionalId?: StringFieldUpdateOperationsInput | string
    dataHora?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusAgendamentoFieldUpdateOperationsInput | $Enums.StatusAgendamento
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    confirmacaoEnviada?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataHoraFim?: DateTimeFieldUpdateOperationsInput | Date | string
    atendimento?: AtendimentoUncheckedUpdateOneWithoutAgendamentoNestedInput
  }

  export type AgendamentoUncheckedUpdateManyWithoutProcedimentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    pacienteId?: NullableStringFieldUpdateOperationsInput | string | null
    profissionalId?: StringFieldUpdateOperationsInput | string
    dataHora?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusAgendamentoFieldUpdateOperationsInput | $Enums.StatusAgendamento
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    confirmacaoEnviada?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataHoraFim?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AtendimentoUpdateWithoutProcedimentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    anotacoes?: NullableStringFieldUpdateOperationsInput | string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamento?: AgendamentoUpdateOneRequiredWithoutAtendimentoNestedInput
    paciente?: PacienteUpdateOneRequiredWithoutAtendimentosNestedInput
    profissional?: ProfissionalUpdateOneRequiredWithoutAtendimentosNestedInput
    tenant?: TenantUpdateOneRequiredWithoutAtendimentosNestedInput
  }

  export type AtendimentoUncheckedUpdateWithoutProcedimentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    agendamentoId?: StringFieldUpdateOperationsInput | string
    pacienteId?: StringFieldUpdateOperationsInput | string
    profissionalId?: StringFieldUpdateOperationsInput | string
    anotacoes?: NullableStringFieldUpdateOperationsInput | string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AtendimentoUncheckedUpdateManyWithoutProcedimentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    agendamentoId?: StringFieldUpdateOperationsInput | string
    pacienteId?: StringFieldUpdateOperationsInput | string
    profissionalId?: StringFieldUpdateOperationsInput | string
    anotacoes?: NullableStringFieldUpdateOperationsInput | string | null
    procedimentosRealizados?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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