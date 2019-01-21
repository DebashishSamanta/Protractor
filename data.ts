import * as dotenv from "dotenv";

dotenv.load();
const CONFIG1_ENVIRONMENTS = {
    environment: {},
    Env_Test1: {
        baseurl: "",
        uid: ""
    }
};



const CONFIG_ENVIRONMENTS = {
    test1: {
          url:"http://newtours.demoaut.com/",
          url1:"",
          mailtrapBoxid:"465159",
          mailtrapToken:"https://mailtrap.io",
          mailtrapUrl:"https://mailtrap.io",

          base2: {
              url1:"",
              url2:"",
          },

          base3: {
            url1:"",
            url2:"",
        },

        base4: {
            url1:"",
            url2:"",
        },


},

   test2: {
    url:"https://www.awwwards.com/sites/airnauts-v2",
    url1:"",

    base2: {
        url1:"",
        url2:"",
    },

    base3: {
      url1:"",
      url2:"",
  },

  base4: {
      url1:"",
      url2:"",
  },


},};


export function getConfig(env: string) {
    (<any>Object).
    assign(CONFIG1_ENVIRONMENTS,CONFIG_ENVIRONMENTS[env]);
    return CONFIG1_ENVIRONMENTS;
}