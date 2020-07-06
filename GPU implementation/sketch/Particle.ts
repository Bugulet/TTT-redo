class Particle{
    private _x:number=0;
    private _y:number=0;
    private _strength:number=1;

    get x():number{
        return this._x;
    }

    get y():number{
        return this._y;
    }

    get strength():number{
        return this._strength
    }

    constructor(_x:number,_y:number,_strength:number){
        this._x=_x;
        this._y=_y;
        this._strength=_strength;
    }
}