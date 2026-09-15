export interface InboundEvent {
    "cursor:move": {
        x: number;
        y: number;
    };
}

export interface OutboundEvent {
    "cursor:update": {
        id: string;
        x: number;
        y: number;
    };
}
