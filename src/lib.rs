use console_error_panic_hook;
use rand::prelude::*;
use ray_tracer::actor::Actor;
use ray_tracer::camera::perspective::PerspectiveCamera;
use ray_tracer::camera::Camera;
use ray_tracer::constants::Axis;
use ray_tracer::hitable::primitive::Cube;
use ray_tracer::hitable::primitive::Group;
use ray_tracer::hitable::primitive::Rectangle;
use ray_tracer::hitable::primitive::Sphere;
use ray_tracer::hitable::transform::Translation;
use ray_tracer::hitable::Hitable;
use ray_tracer::material::dielectric::DielectricMaterial;
use ray_tracer::material::lambertian::LambertianMaterial;
use ray_tracer::material::metal::MetalMaterial;
use ray_tracer::material::plain::PlainMaterial;
use ray_tracer::material::Material;
use ray_tracer::renderer::Image;
use ray_tracer::renderer::Renderer;
use ray_tracer::scene::Scene;
use ray_tracer::texture::checker::CheckerTexture;
use ray_tracer::texture::uniform::UniformTexture;
use ray_tracer::tree::TreeType;
use ray_tracer::vector::Vec3;
use std::panic;
use wasm_bindgen::prelude::*;
use wasm_bindgen::Clamped;
use wasm_bindgen::JsCast;
use web_sys::{CanvasRenderingContext2d, ImageBitmap, ImageData};

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    // The `console.log` is quite polymorphic, so we can bind it with multiple
    // signatures. Note that we need to use `js_name` to ensure we always call
    // `log` in JS.
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_u32(a: u32);

    // Multiple arguments too!
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_many(a: &str, b: &str);
}

#[wasm_bindgen(start)]
pub fn start() -> Result<(), JsValue> {
    log("starting...");
    panic::set_hook(Box::new(console_error_panic_hook::hook));
    let document = web_sys::window().unwrap().document().unwrap();
    let canvas = document.get_element_by_id("canvas").unwrap();
    let canvas: web_sys::HtmlCanvasElement = canvas.dyn_into::<web_sys::HtmlCanvasElement>()?;
    let context = canvas
        .get_context("2d")
        .unwrap()
        .unwrap()
        .dyn_into::<CanvasRenderingContext2d>()
        .unwrap();
    log("Found canvas successfully");

    let image = random_scene();
    log("Image created...");
    log(&format!(
        "created image with size: {}, content: {:?}",
        image.data.len(),
        image.data
    ));
    log(&format!(
        "found width: {}, height: {}",
        image.width as u32, image.height as u32
    ));
    let mut u8_colors: Vec<u8> = image
        .data
        .iter()
        .map(|c| (c * 255.0) as u8)
        .enumerate()
        .fold(Vec::new(), |mut v: Vec<u8>, (idx, color)| {
            v.push(color);
            if (idx + 1) % 3 == 0 {
                v.push(255);
            }
            v
        });
    log(&format!(
        "colors size: {}, expected: {}",
        u8_colors.len(),
        image.width * image.height * 4
    ));
    log(&format!("found colors: {:?}", u8_colors));
    let data =
        ImageData::new_with_u8_clamped_array(Clamped(&mut u8_colors), image.width as u32).unwrap();
    log("Data has been created");
    context.put_image_data(&data, 20.0, 20.0)
}

fn random_scene() -> Image<f64> {
    let mut scene = Scene::<f64>::new();
    // scene.set_background(Vec3::from_array([0.2, 0.2, 0.7]));
    scene.set_background(Vec3::from_array([0.5, 0.7, 0.9]));

    const N_SPHERES_X: usize = 3;
    const N_SPHERES_Y: usize = N_SPHERES_X;

    const MIN_X: f64 = -20.0;
    const MAX_X: f64 = 20.0;

    const MIN_Y: f64 = MIN_X;
    const MAX_Y: f64 = MAX_X;

    const MIN_RADIUS: f64 = 0.2;
    const MAX_RADIUS: f64 = 0.4;

    const SPHERE_PROBABILITY: f64 = 0.666_666_66;

    const LAMBERTIAN_PROBABILITY: f64 = 0.3333;
    const METAL_PROBABILITY: f64 = 0.3333;
    // DIELECTRIC_PROBABILITY is 1 - LAMBERTIAN_PROBABILITY - METAL_PROBABILITY

    const MIN_FUZZINESS: f64 = 0.0;
    const MAX_FUZZINESS: f64 = 0.4;

    const MIN_REFRACTIVE: f64 = 1.2;
    const MAX_REFRACTIVE: f64 = 2.4;

    let mut rng = rand::thread_rng();

    for i in 0..N_SPHERES_X {
        log("creating sphere");
        for j in 0..N_SPHERES_Y {
            let radius = MIN_RADIUS + (MAX_RADIUS - MIN_RADIUS) * rng.gen::<f64>();
            let mut x = i as f64 + rng.gen::<f64>() * (1.0 - radius);
            x = MIN_X + (MAX_X - MIN_X) * x / N_SPHERES_X as f64;
            let mut y = j as f64 + rng.gen::<f64>() * (1.0 - radius);
            y = MIN_Y + (MAX_Y - MIN_Y) * y / N_SPHERES_Y as f64;

            let hitable_select = rng.gen::<f64>();
            let hitable: Box<dyn Hitable<f64>> = if hitable_select < SPHERE_PROBABILITY {
                let hitable = Box::new(Sphere::<f64>::new(radius));
                Box::new(Translation::new(hitable, Vec3::from_array([x, y, radius])))
            } else {
                let l = radius * 2.0 * 0.8;
                let hitable = Box::new(Cube::<f64>::new(l, l, l));
                Box::new(Translation::new(
                    hitable,
                    Vec3::from_array([x, y, radius * 0.8]),
                ))
            };

            let color = Vec3::from_array([rng.gen::<f64>(), rng.gen::<f64>(), rng.gen::<f64>()]);
            let texture = Box::new(UniformTexture::new(color));
            let material_select = rng.gen::<f64>();
            let material: Box<dyn Material<f64>> = if material_select < LAMBERTIAN_PROBABILITY {
                Box::new(LambertianMaterial::<f64>::new(texture, 0.5))
            } else if material_select < LAMBERTIAN_PROBABILITY + METAL_PROBABILITY {
                let fuzziness = MIN_FUZZINESS + (MAX_FUZZINESS - MIN_FUZZINESS) * rng.gen::<f64>();
                Box::new(MetalMaterial::<f64>::new(texture, fuzziness))
            } else {
                let n = MIN_REFRACTIVE + (MAX_REFRACTIVE - MIN_REFRACTIVE) * rng.gen::<f64>();
                Box::new(DielectricMaterial::<f64>::new(texture, n))
            };
            let actor = Actor::<f64> { hitable, material };
            scene.add_actor(actor);
        }
        log("finished creating sphere");
    }
    log("All spheres are created");

    // Three larger spheres in the center
    let radius = 2.0;
    let sphere = Box::new(Sphere::<f64>::new(radius));
    let sphere = Translation::new(sphere, Vec3::from_array([0.0, 0.0, radius]));
    let color = Vec3::from_array([0.78, 1.0, 0.78]);
    let texture = Box::new(UniformTexture::new(color));
    let material = DielectricMaterial::<f64>::new(texture, 2.4);
    let actor = Actor::<f64> {
        hitable: Box::new(sphere),
        material: Box::new(material),
    };
    scene.add_actor(actor);

    let sphere = Box::new(Sphere::<f64>::new(radius));
    let sphere = Translation::new(sphere, Vec3::from_array([0.0, -2.0 * radius, radius]));
    let color = Vec3::from_array([0.9, 0.9, 0.9]);
    let texture = Box::new(UniformTexture::new(color));
    let material = MetalMaterial::<f64>::new(texture, 0.0);
    let actor = Actor::<f64> {
        hitable: Box::new(sphere),
        material: Box::new(material),
    };
    scene.add_actor(actor);

    let sphere = Box::new(Sphere::<f64>::new(radius));
    let sphere = Translation::new(sphere, Vec3::from_array([0.0, 2.0 * radius, radius]));
    let color = Vec3::from_array([1.0, 0.15, 0.15]);
    let texture = Box::new(UniformTexture::new(color));
    let material = MetalMaterial::<f64>::new(texture, 0.1);
    let actor = Actor::<f64> {
        hitable: Box::new(sphere),
        material: Box::new(material),
    };
    scene.add_actor(actor);

    // Sphere used as light
    let radius = 4.0;
    let sphere = Box::new(Sphere::<f64>::new(radius));
    let sphere = Translation::new(sphere, Vec3::from_array([0.0, 1.0, 12.5]));
    let color = Vec3::from_array([1.0, 1.0, 1.0]);
    let texture = Box::new(UniformTexture::new(color));
    let material = PlainMaterial::<f64>::new(texture);
    let actor = Actor::<f64> {
        hitable: Box::new(sphere),
        material: Box::new(material),
    };
    scene.add_actor(actor);

    // Rectangle used as floor
    let length = 2000.0;
    let color0 = Vec3::from_array([1.0, 1.0, 1.0]);
    let color1 = Vec3::from_array([0.8, 0.8, 0.8]);
    let texture0 = UniformTexture::new(color0);
    let texture1 = UniformTexture::new(color1);
    let texture = Box::new(CheckerTexture::new(Box::new(texture0), Box::new(texture1)));

    let hitable = Box::new(Rectangle::<f64>::new(length, Axis::X, length, Axis::Y));
    let hitable = Box::new(Translation::new(
        hitable,
        Vec3::from_array([0.0, 0.0, -radius]),
    ));
    let material = Box::new(LambertianMaterial::<f64>::new(texture, 0.75));
    let actor = Actor::<f64> { hitable, material };
    scene.add_actor(actor);

    let mul = 16;
    let width = 16 * mul;
    let height = 9 * mul;
    let aspect = width as f64 / height as f64;
    let mut camera = PerspectiveCamera::<f64>::new();
    camera.set_aspect(aspect);
    camera.set_fov(0.25 * std::f64::consts::PI);
    camera.set_position(&[-6.0, -10.0, 3.0]);
    camera.set_lookat(&[0.0, 0.0, 2.0]);
    camera.set_up(&[0.0, 0.0, 1.0]);

    // camera.set_position(&[0.0, 0.0, 20.0]);
    // camera.set_lookat(&[0.0, 0.0, 0.0]);
    // camera.set_up(&[0.0, 1.0, 0.0]);

    camera.set_aperture(0.0);
    let focus = (camera.get_lookat() - camera.get_position()).norm();
    camera.set_focus(focus);

    scene.set_tree_type(TreeType::Oct);
    log("Scene has been set up");

    let renderer = Renderer::new(width / 4, height / 4, 0, 2, false);
    log("renderer has been set up");
    let image = renderer.render(&mut scene, &camera);
    log("first image has been created");
    let gamma = 2.0;

    let mut image = Image::new(width, height);
    let renderer = Renderer::new(width, height, 1, 16, false);
    let sampling = 1;
    log("starting sampling...");
    for i in 0..sampling {
        let delta = renderer.render(&scene, &camera);
        mix_images(&mut image, &delta, i);
        log(&format!("Finished sample {:?}", i));
    }
    image
}

fn mix_images(image: &mut Image<f64>, delta: &Image<f64>, iteration: usize) {
    assert_eq!(delta.height, image.height);
    assert_eq!(delta.width, image.width);

    let frac_delta = 1.0 / (iteration + 1) as f64;
    let frac_image = 1.0 - frac_delta;
    for j in 0..image.height {
        for i in 0..image.width {
            let index = j * image.width + i;
            image.data[3 * index] =
                frac_image * image.data[3 * index] + frac_delta * delta.data[3 * index];
            image.data[3 * index + 1] =
                frac_image * image.data[3 * index + 1] + frac_delta * delta.data[3 * index + 1];
            image.data[3 * index + 2] =
                frac_image * image.data[3 * index + 2] + frac_delta * delta.data[3 * index + 2];
        }
    }
}
