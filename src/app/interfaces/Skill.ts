export interface Skill {
    id_skill: number;
    nombre: string;
    descripcion: string;
    niveles: {
        lvl1: number,
        img1: string,
        lvl2: number,
        img2: string,
        lvl3: number,
        img3: string,
    }
}