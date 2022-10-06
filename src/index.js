import './styles/index.scss';

class Test {
  /**
   * 
   * @param {*} name 
   * @param {*} age 
   */
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  render() {
    console.log(this.age, this.name);
    document.getElementsByTagName('body')[0].append('abcdasd 123123 ');
  }
}
const b = new Test('quan', 18);
b.render();
/**
 * 
 */
function test() {
  new Promise((resolve) => resolve('ok')).then((a) => {
    console.log('day la test', a);
    document.getElementsByTagName('body')[0].append('abcdasd 11');
  });
}
test();


/**
 * 
 * @param {*} window 
 */
function app(window) {
  console.log(window);
}

app(window);

export default app;
