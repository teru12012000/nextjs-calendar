"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schedule = void 0;
const express_1 = require("express");
const db_1 = require("../db/db");
exports.schedule = (0, express_1.Router)();
exports.schedule.get('/initialData', (req, res) => {
    db_1.db.serialize(() => {
        db_1.db.all('SELECT * FROM schedule', (err, rows) => {
            if (err) {
                return res.status(500).json({
                    message: "error",
                });
            }
            const resData = rows.map((item) => ({
                id: item.id,
                title: item.title,
                start: item.start,
                end: (item.end) ? item.end : undefined
            }));
            return res.status(200).json({
                message: 'OK',
                data: rows,
            });
        });
    });
});
exports.schedule.post('/addSchedule', (req, res) => {
    const { id, title, start, end } = req.body;
    const endData = (end) ? end : "";
    db_1.db.serialize(() => {
        db_1.db.run("INSERT INTO schedule (id,title,start,end) VALUES ($1,$2,$3,$4)", [id, title, start, endData], (err) => {
            if (err) {
                return res.status(500).json({
                    message: "error",
                });
            }
            else {
                return res.status(200).json({
                    message: 'OK',
                });
            }
        });
    });
});
exports.schedule.put('/changeSchedule', (req, res) => {
    const { id, title, start, end } = req.body;
    const endData = (end) ? end : "";
    db_1.db.serialize(() => {
        db_1.db.run("UPDATE schedule SET title=$1, start=$2, end=$3 WHERE id=$4", [title, start, endData, id], (err) => {
            if (err) {
                return res.status(500).json({
                    message: "error",
                });
            }
            else {
                return res.status(200).json({
                    message: 'OK',
                });
            }
        });
    });
});
exports.schedule.delete('/deleteSchedule/:id', (req, res) => {
    const { id } = req.params;
    db_1.db.serialize(() => {
        db_1.db.run("DELETE FROM schedule WHERE id=$1", [id], (err) => {
            if (err) {
                return res.status(500).json({
                    message: "error",
                });
            }
            else {
                return res.status(200).json({
                    message: 'OK',
                });
            }
        });
    });
});
