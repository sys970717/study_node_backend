import { NextFunction, Request, Response } from "express";
import { Controller } from "../../config/decorators/Controller";
import { Get } from "../../config/decorators/Get";
import { Post } from "../../config/decorators/Post";
import { Put } from "../../config/decorators/Put";

@Controller('orders')
export default class OrderController {
  @Get('/')
  async getOrderList (req: Request, res: Response, next: NextFunction) {
    const { pageNo = 1, pageSize = 10, name } = req.query;

    /**
     * 배송지 테이블 참조 => 배송지 테이블 row id
     * 상품 아이디 ( 제품코드 ),
     * 개수
     * 쿠폰?
     * 포인트?
     */
  }
}