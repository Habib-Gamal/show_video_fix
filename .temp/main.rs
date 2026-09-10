// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rsa::pkcs1::FromRsaPrivateKey;
use rsa::{PaddingScheme, RsaPrivateKey};
use tauri::Manager;
use tauri::Menu;
use tauri::WindowBuilder;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn decrypt_command(url: &str) -> String {
    let result = decrypt(url);
    match result {
        Ok(value) => value,
        Err(e) => format!("Error: {}", e),
    }
}

fn decrypt(url: &str) -> Result<String, Box<dyn std::error::Error>> {
    // Your private key
    const private_key_string: &'static str = "-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgHFXt+b43kfTZBwelcU+WBUL0YMp7QX0XIR4G5eclbx2jJcnSgU2
XsfGVqa15AKz79UbPDJGi4uvz74McG2R8U/AOmX2PVBbjGjuCxVQybGH6ra6WQa5
ATJv1usACj5V5ku0BTB1FzS5IlTF2NFaUGoBL4WWumoZV8uX3Pg4pqxbAgMBAAEC
gYAndREZgGPpf0bnnyImk2iYkw+x6MOSAhq/Jwz7/9AE1wRkjpHvNJlUVNDPopyo
8Dk66AtRuUtVKrRYhf4Rtu/Zi6bgMrYUI9wK1bnIv/2LL133as5LbS2DnoK9Tvqn
HzLraIdCySM+2QEsA4Dt1YEuNT9XUkV9vsEU19R6D3mEMQJBALidrwQbSWPOxbYq
R7gqdgmb3SjrW+GVlQOYDBiQbYBrvv5VsV5x6IfvX3+2CIYepSQBnbzK2gsBBaR0
W3BH1GkCQQCdKwGALwieLNln1BLRssbgtjS//HtOK2mVPfEBntfH+tFXdTlQUdab
l+kRysEgapgClTsI3OFNYPR2KOQxE1IjAkBvx8HNabwg+3SInMb6AnOf08iv2vmx
98DXATvpr6EtjY+CLV6Mgcm6bLxU9mHo2ytARt48DlLBMOg6r90hecxpAkAQ7lUX
DfoLsCErgjkUxgGOq5I7LGPMI/kXzrhryETOkkKC/WnTMT3BPTgqZoEvkMwXWyQk
7EaJI2yyXe1XLBGpAkEAmfHNXtErD/llNRJzcxfcMJfI7PldseZPqKJlcggX1i6m
vTMMKYGIW3yBBiQ8c5N6+Ia4fkJfDLCRMyX6sG1nhg==
-----END RSA PRIVATE KEY-----";

    // Use the string `s` here
    let private_key = RsaPrivateKey::from_pkcs1_pem(&private_key_string)?;
    // Your encrypted message
    let encrypted_message = base64::decode(url)?;
    // Decrypt the message
    let padding = PaddingScheme::new_pkcs1v15_encrypt();
    let decrypted_message = private_key.decrypt(padding, &encrypted_message)?;
    Ok(format!("{}", String::from_utf8(decrypted_message)?))
}

fn main() {
    let menu = Menu::new();

    tauri::Builder::default()
        // .setup(|app| {
        //     let main_window = app.get_window("main").unwrap();
        //     let menu_handle = main_window.menu_handle();
        //     std::thread::spawn(move || {
        //         let empty_menu = Menu::new(); // Create a new, empty menu
        //         menu_handle
        //         .
        //             .expect("error while setting menu");
        //     });
        //     Ok(())
        // })
        .menu(menu)
        .invoke_handler(tauri::generate_handler![greet, decrypt_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
