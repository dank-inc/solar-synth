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

fn gen_slopes(arr: Vec<f32>) -> Vec<f32> {
    let mut slopes = Vec::with_capacity(arr.len() * 2);
    for i in 0..arr.len() {
        let num = arr[i];
        if i == 0 {
            slopes.push(0.0);
            slopes.push(num);

            continue;
        }
        let m = arr[i] - arr[i - 1];
        let b = arr[i] - m * i as f32;

        slopes.push(m);
        slopes.push(b);
    }

    return slopes;
}

#[wasm_bindgen]
pub fn resample(arr: Vec<f32>, slopes: Vec<f32>, ln: i32) -> Vec<f32> {
    // resample
    return vec![];
}

#[wasm_bindgen]
pub fn remap(arr: Vec<f32>, ln: i32) -> Vec<f32> {
    let slopes = gen_slopes(arr);

    return slopes;
}

// Crush down sample into vector map
// resample
// generate buffer
