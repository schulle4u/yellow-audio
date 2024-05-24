<?php
// Audio extension, https://github.com/schulle4u/yellow-audio

class YellowAudio {
    const VERSION = "0.9.1";
    public $yellow;            //access to API
    
    // Handle initialisation
    public function onLoad($yellow) {
        $this->yellow = $yellow;
        $this->yellow->system->setDefault("audioDownload", "0");
        $this->yellow->system->setDefault("audioUrlPrefix", "");
        $this->yellow->system->setDefault("audioStyle", "audio");
        $this->yellow->language->setDefaults(array(
            "Language: en",
            "AudioDescription: HTML5 audio player.",
            "AudioPlayButton: Play",
            "AudioPauseButton: Pause",
            "AudioStopButton: Stop",
            "AudioRewindButton: Rewind",
            "AudioForwardButton: Forward",
            "AudioVolume: Volume",
            "AudioSpeed: Speed",
            "Language: de",
            "AudioDescription: HTML5-Audio-Player.",
            "AudioPlayButton: Abspielen",
            "AudioPauseButton: Pause",
            "AudioStopButton: Stoppen",
            "AudioRewindButton: Zurückspulen",
            "AudioForwardButton: Vorspulen",
            "AudioVolume: Lautstärke",
            "AudioSpeed: Geschwindigkeit",
            "Language: sv",
            "AudioDescription: HTML5 audio player.",
            "AudioPlayButton: Spela",
            "AudioPauseButton: Pause",
            "AudioStopButton: Stop",
            "AudioRewindButton: Spola tillbaka",
            "AudioForwardButton: Snabbspola framåt",
            "AudioVolume: Volym",
            "AudioSpeed: Hastighet"));
    }
    
    // Handle page content element
    public function onParseContentElement($page, $name, $text, $attributes, $type) {
        $output = null;
        if ($name=="audio" && ($type=="block" || $type=="inline")) {
            list($url, $download, $style) = $this->yellow->toolbox->getTextArguments($text);
            if (!preg_match("/^\w+:/", $url)) {
                $url = $this->yellow->system->get("audioUrlPrefix").$url;
            }
            if (!preg_match("/^\w+:/", $url)) {
                $url = $this->yellow->lookup->normaliseUrl(
                    $this->yellow->system->get("coreServerScheme"),
                    $this->yellow->system->get("coreServerAddress"),
                    $this->yellow->system->get("coreServerBase"), $url);
            } else {
                $url = $this->yellow->lookup->normaliseUrl("", "", "", $url);
            }
            if (is_string_empty($download)) $download = $this->yellow->system->get("audioDownload");
            if (is_string_empty($style)) $style = $this->yellow->system->get("audioStyle");
            $output = "<div class=\"".htmlspecialchars($style)."\" role=\"region\" aria-label=\"".htmlspecialchars(ucfirst($name))."\">";
            $output .= "<audio src=\"".htmlspecialchars($url)."\" controls=\"controls\" preload=\"none\">HTML5 audio not supported.</audio>";
            if ($download) $output .= "<p><a href=\"".htmlspecialchars($url)."\">Download</a></p>";
            $output .= "</div>";
        }
        if ($name=="audiolist" && $type=="notice") {
            $htmlAttributes = $this->yellow->lookup->getHtmlAttributes($attributes);
            $output = "<div$htmlAttributes  role=\"region\" aria-label=\"".htmlspecialchars(ucfirst($name))."\" aria-live=\"polite\">\n";
            $output .= "$text\n";
            $output .= "<p><button data-role=\"playPauseButton\" data-playLabel=\"".$this->yellow->language->getTextHtml("audioPlayButton")."\" data-pauseLabel=\"".$this->yellow->language->getTextHtml("audioPauseButton")."\">".$this->yellow->language->getTextHtml("audioPlayButton")."</button> <button data-role=\"stopButton\">".$this->yellow->language->getTextHtml("audioStopButton")."</button> <button data-role=\"rewindButton\">".$this->yellow->language->getTextHtml("audioRewindButton")."</button> <button data-role=\"forwardButton\">".$this->yellow->language->getTextHtml("audioForwardButton")."</button><br />\n";
            $output .= "<label>".$this->yellow->language->getTextHtml("audioVolume")." <input type=\"range\" id=\"volumeControl\" data-role=\"volumeControl\" min=\"0\" max=\"1\" step=\"0.1\" value=\"1\"></label>";
            $output .= "<label>".$this->yellow->language->getTextHtml("audioSpeed")." <input type=\"range\" id=\"speedControl\" data-role=\"speedControl\" min=\"0.5\" max=\"2\" step=\"0.1\" value=\"1\"></label>\n</p>";
            $output .= "</div>\n";
        }
        return $output;
    }

    // Handle page extra data
    public function onParsePageExtra($page, $name) {
        $output = null;
        if ($name=="header") {
            $assetLocation = $this->yellow->system->get("coreServerBase").$this->yellow->system->get("coreAssetLocation");
            $output = "<script type=\"text/javascript\" defer=\"defer\" src=\"{$assetLocation}audio.js\"></script>\n";
        }
        return $output;
    }
}
