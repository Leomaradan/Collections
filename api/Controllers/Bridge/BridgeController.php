<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Controllers\Bridge;

use Slim\Http\Request;
use Slim\Http\Response;

/**
 * Description of BridgeController
 *
 * @author Léo
 */
abstract class BridgeController {
    //put your code here
    public abstract function search(Request $request, Response $response);
    public abstract function gather(Request $request, Response $response);
    
    /* 
    * Author: Ojas Ojasvi 
    * Released: September 25, 2007 
    * Description: An example of the disguise_curl() function in order to grab contents from a website while remaining fully camouflaged by using a fake user agent and fake headers. 
    */     
    public function getUrl($url, $referer = null) {
        $curl = curl_init();
        
        // Setup headers - I used the same headers from Firefox version 2.0.0.6 
        // below was split up because php.net said the line was too long. :/ 
        $header[0] = "Accept: text/xml,application/xml,application/xhtml+xml,"; 
        $header[0] .= "text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5"; 
        $header[] = "Cache-Control: max-age=0"; 
        $header[] = "Connection: keep-alive"; 
        $header[] = "Keep-Alive: 300"; 
        $header[] = "Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7"; 
        $header[] = "Accept-Language: fr-FR,fr;q=0.8,en-US;q=0.6,en;q=0.4"; 
        $header[] = "Pragma: "; // browsers keep this blank.         

        curl_setopt($curl, CURLOPT_URL, $url); 
        curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'); 
        curl_setopt($curl, CURLOPT_HTTPHEADER, $header); 
        curl_setopt($curl, CURLOPT_REFERER, ($referer !== null) ? $referer : 'http://www.google.com'); 
        curl_setopt($curl, CURLOPT_ENCODING, 'gzip,deflate'); 
        curl_setopt($curl, CURLOPT_AUTOREFERER, true); 
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); 
        curl_setopt($curl, CURLOPT_TIMEOUT, 10); 

        $html = curl_exec($curl); // execute the curl command 
        curl_close($curl); // close the connection 

        return $html; // and finally, return $html 
    }
    
    public function getHtmlDom($url, $referer = null) {
        $html = $this->getUrl($url, $referer);
        return str_get_html($html);
    }
}
