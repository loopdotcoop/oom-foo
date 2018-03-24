# Setting Up WordPress

The ${{title}} frontend may optionally be connected to a WordPress backend.


#### Setting up a clean install of macOS 10.13 High Sierra (from [Neil Gee’s article](https://coolestguidesontheplanet.com/install-apache-mysql-php-and-phpmyadmin-on-macos-high-sierra-10-13/)):

1. Apache should already be installed:  
  `$ httpd -v` should output `Server version: Apache/2.4.28 (Unix)` or similar.
2. Create your user’s ‘Sites’ folder (macOS no longer creates by default):  
  `$ mkdir ~/Sites; chmod 755 ~/Sites`
3. Check that your user does not currently have an Apache config file:  
  ``$ cat /etc/apache2/users/`whoami`.conf``
4. Create your user’s Apache config file:
  ```
  $ sudo bash -c 'echo -e \
  "<Directory \"/Users/'`whoami`'/Sites/\">"\
  "\n  AllowOverride All"\
  "\n  Options Indexes MultiViews FollowSymLinks"\
  "\n  Require all granted"\
  "\n</Directory>\n" > /etc/apache2/users/'`whoami`'.conf';\
  sudo chmod 644 /etc/apache2/users/`whoami`.conf
  ```
5. `$ sudo nano /etc/apache2/httpd.conf` and uncomment these lines:  
  `LoadModule authz_core_module libexec/apache2/mod_authz_core.so` (already unc.)  
  `LoadModule authz_host_module libexec/apache2/mod_authz_host.so` (already unc.)  
  `LoadModule userdir_module libexec/apache2/mod_userdir.so`  
  `LoadModule include_module libexec/apache2/mod_include.so`  
  `LoadModule rewrite_module libexec/apache2/mod_rewrite.so`  
  `LoadModule php7_module libexec/apache2/libphp7.so`  
  `Include /private/etc/apache2/extra/httpd-userdir.conf` (allows for home dirs)
6. `$ sudo nano /etc/apache2/extra/httpd-userdir.conf` and uncomment this line:  
  `Include /private/etc/apache2/users/*.conf`
7. After `$ sudo apachectl start` (perhaps after a restart):  
  `$ echo '<?php phpinfo(); ?>' > ~/Sites/index.php`  
  ``$ open http://localhost/~`whoami` `` should show the PHP info page
8. Install mysql-5.7.21-1-macos10.13-x86_64.dmg (339MB) from [here](https://dev.mysql.com/downloads/mysql/).  
  The .tar.gz would not be simple to set up. Click ‘No thanks, just start my download.’
9. Add MySQL to your PATH:  
  `$ echo -e '\nexport PATH="/usr/local/mysql/bin:$PATH"' >> ~/.bash_profile`  
  `$ source ~/.bash_profile` (make it immediately available)
10. Change the unique password for the MySQL ‘root’ user:  
  `$ sudo /usr/local/mysql/support-files/mysql.server stop` to stop mysql if running  
  `$ sudo mysqld_safe --skip-grant-tables` to start MySQL in safe mode  
  `cmd-z` and `$ bg` to send the running process to your Bash session’s background  
  `$ mysql -u root` to begin the MySQL monitor  
  `mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';`  
  `mysql> \q` to quit — the new password is 'root'  
  `$ fg` and `ctrl-c` to quit safe-mode MySQL
11. In ‘System Preferences > MySQL’, deselect ‘Automatically start … Startup’  
12. Fix the 2002 MySQL Socket error:
  `$ sudo mkdir /var/mysql; sudo ln -s /tmp/mysql.sock /var/mysql/mysql.sock`
13. Download phpMyAdmin-4.7.9-english.tar.gz (5.7MB) from [here](https://www.phpmyadmin.net/downloads/), and then:  
  `$ tar xzf ~/Downloads/phpMyAdmin-4.7.9-english.tar.gz -C ~/Sites`  
  `$ ln -s ~/Sites/phpMyAdmin-4.7.9-english ~/Sites/phpmyadmin`  
  `$ mkdir ~/Sites/phpmyadmin/config; chmod o+w ~/Sites/phpmyadmin/config`  
  ``$ open http://localhost/~`whoami`/phpmyadmin/setup/``  
  Click ‘new server’, the ‘Authentication’ tab.  
  Enter 'root' next to ‘Password for config auth’.  
14. Download the WordPress .tar.gz (8.2MB) from [here](https://wordpress.org/download/), and then:  
  `$ tar xzf ~/Downloads/wordpress-4.9.4.tar.gz -C ~/Sites`  
  `$ ln -s ~/Sites/wordpress ~/Sites/wp`  


#### Setting up ${{title}} for WordPress:

1. Start the MySQL server and create a database.
  `$ sudo /usr/local/mysql/support-files/mysql.server start`  
  ``$ open http://localhost/~`whoami`/phpmyadmin/server_databases.php`` (password is 'root')  
  Enter '${{projectLC.replace(/-/g,"\u005f")}}' as the ‘Database name’.  
2. Link WordPress to the ${{projectLC}} repo, and then initialise the site:  
  `$ cd path/to/${{projectLC}}` (cd to the ${{projectLC}} repo directory)  
  `$ ln -s $PWD'/wp/wp-config.php' ~/Sites/wp`  
  `$ ln -s $PWD'/wp/plugin' ~/Sites/wp/wp-content/plugins/${{projectLC}}`  
  `$ ln -s $PWD'/wp/plugin/wp-plugin-entrypoint.php' wp/plugin/${{projectLC}}.php`  
  ``$ open http://localhost/~`whoami`/wp`` should show the ‘Welcome’ page  
  Enter '${{projectLC}}' as the ‘Database name’.  
  Enter 'root' as the ‘Username’ and ‘Password’, and check ‘Confirm use …’.  
  Enter a real email you have access to for the ‘Your Email’.  
  Click through to confirm and log in to wp-admin.  
  Note: at this point, none of the files in ‘~/Sites/wp/’ have changed.  
  The ‘${{projectLC.replace(/-/g,"\u005f")}}’ database’s ‘wp_options’ table is populated with 128 rows.  
  Also, the ‘root’ user, default comment and posts, and the ‘Uncategorized’ category.  


#### Before each dev session:

1. Start Apache and MySQL:  
  `$ sudo apachectl start`  
  `$ sudo /usr/local/mysql/support-files/mysql.server start`


#### After each dev session:

1. Stop Apache and MySQL:  
  `$ sudo apachectl stop`  
  `$ sudo /usr/local/mysql/support-files/mysql.server stop`
