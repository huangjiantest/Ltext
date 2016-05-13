/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2016-5-10 16:32:22                           */
/*==============================================================*/


create database epay default charset = utf8;
use epay;

/*==============================================================*/
/* Table: guanliyuan                                            */
/*==============================================================*/
create table admin
(
   aid                  int not null auto_increment,
   cname                varchar(100),
   email                varchar(100),
   password             varchar(100),
   addtime              datetime,
   issupper             int,
   primary key (aid)
);
insert into admin values(default,'lys','admin@qq.com','123',now(),0);

/*==============================================================*/
/* Table: news                                                  */
/*==============================================================*/
create table news
(
   nid                  int not null auto_increment,
   ntitle               varchar(100),
   content              text,
   pubdate              datetime,
   author               int,
   primary key (nid)
);

/*==============================================================*/
/* Table: product                                               */
/*==============================================================*/
create table product
(
   pid                  int not null auto_increment,
   pname                varchar(100),
   price                numeric(10,2),
   stock                int,
   imgpath              varchar(200),
   type                 int,
   primary key (pid)
);

/*==============================================================*/
/* Table: shangpinfenlei                                        */
/*==============================================================*/
create table producttype
(
   tid                  int not null auto_increment,
   typename             varchar(100),
   typeinfo             varchar(500),
   pid                  int,
   primary key (tid)
);

