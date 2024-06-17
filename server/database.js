import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()
 
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

const pool2 = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE_2
}).promise()

export async function getWrappers() {
    const [rows] = await pool.query(`
    SELECT * FROM wrappers
    WHERE wrapperStatus = 'active'
    `)
    return rows
}

export async function getTasks() {
    const [rows] = await pool.query(`
        SELECT *, DATE_FORMAT(taskDate, '%m-%d') AS taskDay,
                  DATE_FORMAT(taskForDate, '%m-%d') AS forDay
        FROM tasks 
        WHERE taskStatus = 'incomplete' OR 'complete'
    `)
    return rows
}

export async function createList(name, type) {
    await pool.query(`
    INSERT INTO wrappers (wrapperName, wrapperType, wrapperStatus)
    VALUES (?, ?, "active")
    `, [name, type])
}

export async function removeList(id) {
    await pool.query(`
    UPDATE wrappers
    SET wrapperStatus = "inactive" WHERE wrapperId = ?
    `, [id])
}

export async function addTask(task, forDate, id) {
    await pool.query(`
    INSERT INTO tasks (task, taskDate, taskStatus, isEditing, wrapperId, taskForDate)
    VALUES (?, NOW(), "incomplete", false, ?, ?)
    `, [task, id, forDate])
}

export async function deleteTask(id) {
    await pool.query(`
    UPDATE tasks
    SET taskStatus = "recorded" WHERE taskId = ?
    `, [id])
}

export async function getJournals() {
    const [rows] = await pool2.query(`
    SELECT *, DATE_FORMAT(journalDate, '%Y-%m-%d %H:%i:%s') AS logDate
    FROM journalLogs
    ORDER BY logDate DESC
    `)
    return rows
}

export async function addJournal(title, content) {
    await pool2.query(`
    INSERT INTO journalLogs (journalTitle, journalContent, journalDate)
    VALUES (?, ?, NOW())
    `, [title, content])
}