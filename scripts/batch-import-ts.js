const sequelize = require("../config/database");
const Question = require("../models/question");

const tsQuestions = [
  {
    title: "TypeScript有哪些基本类型？",
    content: "请列举TypeScript的基本数据类型。",
    answer: `**基本类型：**
\`\`\`typescript
// 原始类型
let str: string = 'hello';
let num: number = 42;
let bool: boolean = true;
let nullVal: null = null;
let undefinedVal: undefined = undefined;
let symbolVal: symbol = Symbol('key');
let bigIntVal: bigint = 100n;

// 数组
let arr1: number[] = [1, 2, 3];
let arr2: Array<number> = [1, 2, 3];

// 元组
let tuple: [string, number] = ['hello', 42];

// 对象
let obj: { name: string; age: number } = { name: 'Tom', age: 18 };

// any（不推荐）
let anything: any = '任意类型';

// unknown
let notSure: unknown = '未知类型';

// void
function foo(): void { console.log('no return'); }

// never（永远不会返回）
function error(message: string): never {
  throw new Error(message);
}
\`\`\`

**接口：**
\`\`\`typescript
interface Person {
  name: string;
  age: number;
  address?: string; // 可选属性
  readonly id: number; // 只读属性
  [key: string]: any; // 索引签名
}

let user: Person = {
  name: 'Tom',
  age: 18,
  id: 1
};
\`\`\``,
    analysis: "TypeScript类型系统是其核心，掌握基本类型很重要。",
    difficulty: "easy",
    categoryId: 6,
    tags: ["基本类型", "TypeScript", "类型系统"],
  },
  {
    title: "TypeScript接口和类型别名有什么区别？",
    content: "请解释interface和type的区别和使用场景。",
    answer: `**接口（Interface）：**
\`\`\`typescript
interface Person {
  name: string;
  age: number;
}

// 继承
interface User extends Person {
  id: number;
}

// 声明合并
interface Window {
  env: string;
}
interface Window {
  api: string;
}
\`\`\`

**类型别名（Type）：**
\`\`\`typescript
type Person = {
  name: string;
  age: number;
};

// 联合类型
type Status = 'pending' | 'success' | 'error';

// 交叉类型
type User = Person & { id: number };

// 元组
type Tuple = [string, number];

// 工具类型
type PartialPerson = Partial<Person>;
\`\`\`

**主要区别：**
1. **声明合并** - 接口可以，类型别名不行
2. **继承/扩展** - 接口用extends，类型别名用&
3. **用途范围** - 接口主要用于对象，类型别名可以是任何类型
4. **性能** - 接口类型检查更快

**推荐使用：**
- 对象类型 → interface
- 联合类型、工具类型 → type`,
    analysis: "理解interface和type的区别有助于写出更好的TypeScript。",
    difficulty: "medium",
    categoryId: 6,
    tags: ["interface", "type", "接口", "类型别名"],
  },
  {
    title: "TypeScript泛型是什么？如何使用？",
    content: "请解释TypeScript泛型的概念和使用方法。",
    answer: `**基本用法：**
\`\`\`typescript
// 泛型函数
function identity<T>(arg: T): T {
  return arg;
}

identity<string>('hello');
identity('hello'); // 类型推断

// 泛型接口
interface Container<T> {
  value: T;
  getValue(): T;
}

class Box<T> implements Container<T> {
  constructor(public value: T) {}
  getValue(): T { return this.value; }
}

// 泛型约束
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): number {
  return arg.length;
}
\`\`\`

**常见工具类型：**
\`\`\`typescript
// Partial - 所有属性可选
type PartialUser = Partial<{ name: string; age: number }>;

// Required - 所有属性必填
type RequiredUser = Required<PartialUser>;

// Pick - 选择部分属性
type NameOnly = Pick<{ name: string; age: number }, 'name'>;

// Omit - 移除部分属性
type AgeOnly = Omit<{ name: string; age: number }, 'name'>;

// Exclude - 排除类型
type Status = Exclude<'a' | 'b' | 'c', 'a'>; // 'b' | 'c'

// Record - 构造对象
type Dict = Record<string, number>;
\`\`\``,
    analysis: "泛型是TypeScript最强大的特性之一，实现类型复用。",
    difficulty: "hard",
    categoryId: 6,
    tags: ["泛型", "工具类型", "TypeScript"],
  },
  {
    title: "TypeScript的类有哪些特性？",
    content: "请解释TypeScript中类的特性和用法。",
    answer: `**类的基本用法：**
\`\`\`typescript
class Person {
  // 属性修饰符
  public name: string;      // 公开（默认）
  private _age: number;     // 私有
  protected gender: string; // 保护
  readonly id: number;      // 只读
  
  constructor(name: string, age: number) {
    this.name = name;
    this._age = age;
  }
  
  // 访问器
  get age(): number {
    return this._age;
  }
  set age(value: number) {
    if (value > 0) this._age = value;
  }
  
  // 静态属性/方法
  static species = 'human';
  static isPerson(obj: any): boolean {
    return obj instanceof Person;
  }
}

class Student extends Person {
  grade: number;
  
  constructor(name: string, age: number, grade: number) {
    super(name, age);
    this.grade = grade;
  }
}
\`\`\`

**抽象类：**
\`\`\`typescript
abstract class Animal {
  abstract makeSound(): void;
  move(): void { console.log('moving'); }
}

class Dog extends Animal {
  makeSound(): void { console.log('woof'); }
}
\`\`\``,
    analysis: "TypeScript类增加了访问修饰符等面向对象特性。",
    difficulty: "medium",
    categoryId: 6,
    tags: ["类", "面向对象", "TypeScript"],
  },
  {
    title: "TypeScript类型断言是什么？",
    content: "请解释类型断言的概念和使用场景。",
    answer: `**类型断言：**
\`\`\`typescript
// 尖括号语法
let someValue: any = 'hello';
let strLength: number = (<string>someValue).length;

// as语法（推荐）
let strLength2: number = (someValue as string).length;

// 非空断言
function fn(x?: string | null) {
  console.log(x!.toUpperCase()); // 断言x非空
}

// 断言为更具体的类型
const el = document.getElementById('app') as HTMLInputElement;
el.value = 'test';
\`\`\`

**双重断言：**
\`\`\`typescript
// 先断言为unknown，再断言为目标类型
let value: any = 'hello';
let num: number = value as unknown as number;
\`\`\``,
    analysis: "类型断言是告诉编译器我们更清楚类型，谨慎使用。",
    difficulty: "medium",
    categoryId: 6,
    tags: ["类型断言", "TypeScript", "as"],
  },
  {
    title: "什么是TypeScript装饰器？",
    content: "请解释装饰器的概念和使用方法。",
    answer: `**装饰器：**
\`\`\`typescript
// 类装饰器
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Person {
  name: string;
}

// 方法装饰器
function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.log('before');
    return original.apply(this, args);
  };
}

class Calculator {
  @log
  add(a: number, b: number) { return a + b; }
}

// 属性装饰器
function readonly(target: any, key: string) {
  Object.defineProperty(target, key, { writable: false });
}

class Book {
  @readonly
  title = 'TypeScript';
}
\`\`\`

**注意：**
装饰器需要在tsconfig.json中启用：
\`\`\`json
{
  "experimentalDecorators": true
}
\`\`\``,
    analysis: "装饰器是实验性特性，用于扩展类的行为。",
    difficulty: "hard",
    categoryId: 6,
    tags: ["装饰器", "TypeScript", "Decorator"],
  },
];

async function batchImport() {
  try {
    const created = await Question.bulkCreate(tsQuestions);
    console.log(`成功导入 ${created.length} 道TypeScript面试题`);
    process.exit(0);
  } catch (error) {
    console.error("导入失败:", error);
    process.exit(1);
  }
}

batchImport();
