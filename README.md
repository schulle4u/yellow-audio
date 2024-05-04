<p align="right"><a href="README-de.md">Deutsch</a> &nbsp; <a href="README.md">English</a></p>

# Audio 0.9.1

HTML5 audio player.

<p align="center"><img src="SCREENSHOT.png" alt="Screenshot"></p>

## How to install an extension

[Download ZIP file](https://github.com/schulle4u/yellow-audio/archive/refs/heads/main.zip) and copy it into your `system/extensions` folder. [Learn more about extensions](https://github.com/annaesvensson/yellow-update).

## How to use the player

Create an `[audio]` shortcut.
 
The following arguments are available, all but the first argument are optional:

`Url` = URL of audio file, e.g. OGG or MP3  
`Download` = show download link for audio file, 1 or 0  
`Style` = CSS class of player 

## How to use audio links

Create a notice block using an `audiolist` ID. Every link inside the block will be treated as audio link. To activate the playback controls, create a `[audiocontrols]` shortcut somewhere in your page. 

## Examples

Embedding a single audio track:

    [audio /media/downloads/demo.mp3]

Embedding a single audio track, different style:

    [audio /media/downloads/episode-47.mp3 - right]

Embedding a track from an external URL and allow downloading:

    [audio http://wolke.robbenradio.de/podcasts/rt033_yellow.mp3 1]

Content file with list of playable audio links:

~~~
---
Title: Audio page
---
Here is a list of audio files, just click on any of the links to play them. To download a file, right-click and save as. 

! {#audiolist}
! * [File 1](/media/downloads/file1.mp3)
! * [File 2](/media/downloads/file2.mp3)
! * [External file](http://wolke.robbenradio.de/podcasts/rt033_yellow.mp3)
! * [Radio Stream](https://stream.powerradio4u.de:8000/p4u.mp3)

[audiocontrols]
~~~

## Settings

The following settings can be configured in file `system/extensions/yellow-system.ini`: 

`AudioDownload` = show download link for audio files, 1 or 0  
`AudioUrlPrefix` = URL prefix for audio files on a CDN  
`AudioStyle` = CSS class to use for the player  

## Acknowledgements

Thanks to the Datenstrom Yellow community for help and feedback!

## Developer

Steffen Schultz. [Get help](https://datenstrom.se/yellow/help/).
