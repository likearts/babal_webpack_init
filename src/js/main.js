import { pi, power, Foo } from "./libs";
import { config } from "./f/config";
console.log('main');

console.log(pi);
console.log(power(pi, pi));

const f = new Foo();
console.log(f.foo());
console.log(f.bar());
console.log(config.env);
console.log('API_SERVER', process.env.API_SERVER);

const settime = () => {
    setTimeout( () => {
        console.log( new Date().toDateString(), 'NOW' );
    },2000)
}

const test = () => {
    return new Promise( r => {
        setTimeout( () => {
            console.log('THEN')
            r(true)
        },6000)
    })
}

const init = async () => {
    await test();
    console.log('test after');
    settime();

    if( await test() ) {
        console.log('IF AWAIT PRINT: success' )
    }
}

init();