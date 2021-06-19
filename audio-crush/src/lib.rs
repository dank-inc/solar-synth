use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
    pub fn lawg(n: i32);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}", name))
}

pub fn genSlopes(arr: Vec<f32>) -> Vec<f32> {
    let ln = arr.len();
    let mut slopes = vec![];
    slopes.push(1.2);
    return slopes;
}

#[wasm_bindgen]
pub fn remap(arr: Vec<f32>, ln: i32) -> Vec<f32> {
    lawg(ln);
    return arr;
}

// Crush down sample into vector map
// resample
// generate buffer
