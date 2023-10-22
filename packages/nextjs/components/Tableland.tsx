"use client";

import { useState } from "react";
import { useSigner } from "../hooks/useSigner";
import { Database } from "@tableland/sdk";
import { Graduate, data as graduatesData, hash as graduatesHash } from "~~/data/tablelanddb";

// A component with form inputs to to create a table, write data to it, and read data from it
export function Tableland() {
  // Custom table prefix, used when creating the table and via form input
  const [prefix, setPrefix] = useState<string>("memories_");
  // Tableland-generated table name in the form `prefix_chainId_tableId`
  const [tableName, setTableName] = useState<string>("graduates_11155111_302");
  // Form input for the table's value
  const [writeData, setWriteData] = useState<string>("");
  const [readSql, setReadSql] = useState<string>(`SELECT * FROM ${tableName}`);
  const [data, setData] = useState<Graduate[]>(graduatesData);
  // Get the connected signer
  const signer = useSigner();

  // Create a table with hardcoded prefix and schema
  async function create() {
    try {
      const db = new Database({ signer });
      // Example table schema with an `id` and `val` column
      const schema = `id integer primary key, val text`;
      const { meta: create } = await db.prepare(`CREATE TABLE "${prefix}" (${schema});`).run();
      await create.txn?.wait();
      const { name: tableName } = create.txn!;
      setTableName(tableName);
      console.log(`Created table: ${tableName}`);
    } catch (err: any) {
      console.log(err.message);
    }
  }

  // Write data to the table from a form input
  async function write() {
    try {
      const db = new Database({ signer });
      if (tableName !== undefined) {
        const { meta: write } = await db.prepare(`INSERT INTO ${tableName} (val) VALUES (?);`).bind(writeData).run();
        await write.txn?.wait();
        console.log(`Successfully wrote data to table '${tableName}'`);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  }

  // Read table data upon button click
  async function read() {
    try {
      console.log(`Read data from table '${tableName}', signer: ${signer}`);
      const db = new Database({ signer });
      if (tableName !== undefined) {
        const { results } = await db.prepare(readSql).all<Graduate>();
        console.log(`Read data from table '${tableName}':`);
        console.log(results);
        setData(results);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  }

  // Handle button click actions
  async function handleClick(e: any) {
    e.preventDefault();
    switch (e.target.name) {
      case "create":
        await create();
        break;
      case "write":
        await write();
        break;
      case "read":
        await read();
        break;
      default:
        break;
    }
  }

  // Handle form input changes for table prefix & writing data
  function handleChange(e: any) {
    switch (e.target.name) {
      case "create":
        setPrefix(e.target.value);
        break;
      case "write":
        setWriteData(e.target.value);
        break;
      default:
        break;
    }
  }

  // Basic form and tabular view that renders table data
  return (
    <>
      <div className="p-4">
        <h2 className="text-xl font-semibold">Table setup & actions</h2>
        <form className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <label>
              <span className="font-medium">Create table</span>
            </label>
            <input
              className="input input-bordered w-full max-w-xs"
              onChange={handleChange}
              name="create"
              placeholder="starter_table"
              disabled={signer ? false : true}
            />
            <button
              className="btn btn-accent  disabled:bg-gray-300 disabled:cursor-not-allowed"
              onClick={handleClick}
              name="create"
              disabled={signer ? false : true}
            >
              Create
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label>
              <span className="font-medium">Write data</span>
            </label>
            <input
              className="input input-bordered w-full max-w-xs"
              onChange={handleChange}
              name="write"
              placeholder="Bobby Tables"
              disabled={signer && tableName ? false : true}
            />
            <button
              className="btn btn-accent disabled:cursor-not-allowed"
              onClick={handleClick}
              name="write"
              disabled={signer && tableName ? false : true}
            >
              Write
            </button>
          </div>
        </form>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-semibold">Table info</h2>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              <input
                onInput={e => setTableName(e.currentTarget.value)}
                className="input input-bordered w-full max-w-xs"
                value={tableName}
              />
            </h3>
            <button type="button" className="btn btn-accent" onClick={handleClick} name="read">
              Read
            </button>
          </div>
          <input
            onInput={e => setReadSql(e.currentTarget.value)}
            className="input input-bordered w-full max-w-xs"
            value={readSql}
          />
          <h2 className="mt-4 text-lg font-semibold">Data:</h2>
          <div className="mt-2">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">id</th>
                  <th className="border p-2">firstname</th>
                  <th className="border p-2">lastname</th>
                  <th className="border p-2">graduation_year</th>
                  <th className="border p-2">school_name</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td className="border p-2">N/A</td>
                    <td className="border p-2">N/A</td>
                  </tr>
                ) : (
                  data.map(d => (
                    <tr key={d.id}>
                      <td className="border p-2">{d.id}</td>
                      <td className="border p-2">{d.firstname}</td>
                      <td className="border p-2">{d.lastname}</td>
                      <td className="border p-2">{d.graduation_year}</td>
                      <td className="border p-2">{d.school_name}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <h2 className="mt-4 text-lg font-semibold">Data Hash:</h2>
            <code>{graduatesHash}</code>
            <p className="font-light text-sm">
              This hash is computed from the data above and stored on the blockchain. It can be used to quickly verify
              the integrity of the data in the database, checked against the smart contract.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
