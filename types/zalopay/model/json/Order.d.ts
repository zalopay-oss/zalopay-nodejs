export interface CreateOrderRequestJSON {
    app_id?: number;
    app_trans_id: string;
    mac?: string;
    app_user: string;
    app_time?: number;
    amount: number;
    item: string;
    description: string;
    embed_data: string;
    bank_code: string;
    callback_url?: string;
    device_info?: string;
    sub_app_id?: string;
    title?: string;
    currency?: string;
    phone?: string;
    email?: string;
    address?: string;
}
export interface CreateOrderResponseJSON {
    return_code: number;
    return_message: string;
    sub_return_code: number;
    sub_return_message: string;
    order_url: string;
    zp_trans_token: string;
}
export interface CreateQuickPayOrderRequestJSON {
    app_id?: number;
    app_user: string;
    app_trans_id: string;
    app_time?: number;
    amount: number;
    title?: string;
    description: string;
    callback_url?: string;
    device_info?: string;
    redirect_url?: string;
    item: string;
    embed_data: string;
    mac?: string;
    payment_code: string;
    currency?: string;
    userIP?: string;
}
export interface CreateQuickPayOrderResponseJSON {
    return_code: number;
    return_message: string;
    sub_return_code: number;
    sub_return_message: string;
    is_processing: string;
    zp_trans_id: string;
}
export interface CreateRefundOrderRequestJSON {
    m_refund_id: string;
    app_id: number;
    zp_trans_id: string;
    amount: number;
    timestamp: number;
    mac: string;
    description: string;
}
export interface CreateRefundOrderResponseJSON {
    return_code: number;
    return_message: string;
    sub_return_code: number;
    sub_return_message: string;
    refund_id: string;
}
export interface CreateZODOrderRequestJSON {
    appId: string;
    mcRefId: string;
    hubId?: string;
    driverId: string;
    amount: number;
    mac: string;
    receiver: any;
    orderInfo: ZODOrderInfoJSON[];
    mcExtInfo: any;
}
export interface ZODOrderInfoJSON {
    trackingNumber: string;
    description: string;
    amount: number;
}
export interface CreateZODOrderResponseJSON {
    orderUrl: string;
}
export interface QueryOrderRequestJSON {
    app_id?: number;
    app_trans_id: string;
    mac?: string;
}
export interface QueryOrderResponseJSON {
    return_code: number;
    return_message: string;
    sub_return_code: number;
    sub_return_message: string;
    is_processing: boolean;
    zp_trans_id: number;
    amount: number;
}
