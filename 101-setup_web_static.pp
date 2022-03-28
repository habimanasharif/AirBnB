#puppet manifest to prepare a server for deployment

file { "0-setup_web_static.sh":
	source => "puppet:////root/AirBnB_clone_v2/0-setup_web_static.sh",
}
->
exec { "run setup file":
    command => '/root/AirBnB_clone_v2/0-setup_web_static.sh',
}

