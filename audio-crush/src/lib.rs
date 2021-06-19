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

// private
fn genSlopes(arr: Vec<f32>) -> Vec<f32> {
    let _ln = arr.len();
    let mut slopes = vec![];
    slopes.push(1.2);
    return slopes;
}

pub fn resample(frame: i32, arr: Vec<f32>) {}

#[wasm_bindgen]
pub fn remap(arr: Vec<f32>, ln: i32) -> Vec<f32> {
    lawg(ln);
    let slopes = genSlopes(arr);
    return slopes;
}

// Crush down sample into vector map
// resample
// generate buffer
