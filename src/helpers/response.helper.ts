import { Request, Response } from "express";
export const successResponse = async (req: Request, res: Response, datas: any) => {
    res.send({
        status: datas.status || true,
        code: datas.code || 200,
        message: datas.message || "Success Response!",
        data: datas.data || null
    });
};

export const errorResponse = async (req: Request, res: Response, errors: any) => {
    res.send({
        status: errors.status || false,
        code: errors.code || 500,
        message: errors.message || "Internal Server Error!",
        data: errors.data || null
    });
};

export const renderResponse = async (req: Request, res: Response, data: any) => {
    res.render(data.pageName, { title: data.title, data: data.data });
}; 