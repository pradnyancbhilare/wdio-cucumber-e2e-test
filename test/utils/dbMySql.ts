import {createPool} from "mysql"

const pool = createPool({
    //@ts-ignore
    host: browser.config.MySql_DB_Server,
    //@ts-ignore
    port: browser.config.MySql_DB_Port,
    //@ts-ignore
    databse: browser.config.MySql_DB_Name,
    //@ts-ignore
    user: browser.config.MySql_DB_User,
    //@ts-ignore
    password: browser.config.MySql_DB_Password,
    connectionLimit: 10
})

async function getMySqlQueryResult(query: string): Promise<any> {
    pool.query(query, (err,result)=>{
        if(!err) {
            console.log(`>> Query Result: ${result}`)
            return result
        } else {
            console.log(`${err.message}`)
        }
    })
}

export {getMySqlQueryResult}