"use client";

import { useState } from "react";
import { useSigner } from "../hooks/useSigner";
import { Database } from "@tableland/sdk";

// Example table schema
interface TableData {
  id: number;
  val: string;
}

// A component with form inputs to to create a table, write data to it, and read data from it
export function Tableland() {
  // Custom table prefix, used when creating the table and via form input
  const [prefix, setPrefix] = useState<string>("");
  // Tableland-generated table name in the form `prefix_chainId_tableId`
  const [tableName, setTableName] = useState<string | undefined>();
  // Form input for the table's value
  const [writeData, setWriteData] = useState<string>("");
  const [data, setData] = useState<TableData[]>([]);
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
      const db = new Database({ signer });
      if (tableName !== undefined) {
        const { results } = await db.prepare(`SELECT * FROM ${tableName}`).all<TableData>();
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
      <div className="w-full max-w-xs mx-6">
        <h2 className="text-xl font-bold mb-2">Table setup & actions</h2>
        <form className="card p-2 mb-2 mr-2">
          <div className="mb-4">
            <label className="label">
              <span className="label-text font-bold">Create your table</span>
            </label>
            <input
              onChange={handleChange}
              name="create"
              placeholder="starter_table"
              disabled={signer ? false : true}
              className="input input-bordered"
            ></input>
            <button onClick={handleClick} name="create" disabled={signer ? false : true} className="btn ml-2">
              Create
            </button>
          </div>

          <div className="mb-4">
            <label className="label">
              <span className="label-text font-bold">Write data</span>
            </label>
            <input
              onChange={handleChange}
              name="write"
              placeholder="Bobby Tables"
              disabled={signer && tableName ? false : true}
              className={`input input-bordered ${signer && tableName ? "" : "opacity-50 cursor-not-allowed"}`}
            ></input>
            <button
              onClick={handleClick}
              name="write"
              className={`btn ml-2 ${signer && tableName ? "" : "opacity-50 cursor-not-allowed"}`}
            >
              Write
            </button>
          </div>

          <div className="flex justify-center mt-8 mb-2">
            <button
              type="button"
              onClick={handleClick}
              name="read"
              className={`btn ${signer && tableName ? "" : "opacity-50 cursor-not-allowed"}`}
            >
              Read
            </button>
          </div>
        </form>
      </div>

      <div className="w-full max-w-xs mx-6">
        <h2 className="text-xl font-bold mb-2">Table info</h2>
        <div className="card p-2 mb-2 mr-2">
          <h3 className="mb-2">
            <span className="font-bold">Name:</span> {tableName || "N/A"}
          </h3>
          <h2 className="font-bold">Data:</h2>
          <div className="flex justify-center">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="border bg-gray-200 px-4 py-2 font-bold">id</th>
                  <th className="border bg-gray-200 px-4 py-2 font-bold">val</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td className="border px-4 py-2">N/A</td>
                    <td className="border px-4 py-2">N/A</td>
                  </tr>
                ) : (
                  data.map(d => (
                    <tr key={d.id}>
                      <td className="border px-4 py-2">{d.id}</td>
                      <td className="border px-4 py-2">{d.val}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
