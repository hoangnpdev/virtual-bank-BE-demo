CREATE TABLE account
(
    account_id varchar(255) primary key,
    account_name varchar(255),
    card_id      varchar(255),
    balance      bigint default 0,
    password     varchar(255)
);

drop table account;

select create_distributed_table('account', 'account_id');


CREATE TABLE citus.merchant
(
    account_id varchar(255) references citus.account(account_id), -- fk key
    merchant_id varchar(255), -- uuid
    access_code varchar(255)
);

select create_distributed_table('merchant', 'account_id', colocate_with => 'account');

create table citus.payment
(
    account_id varchar(255) references citus.account(account_id), -- fk key
    merchant_id varchar(255), -- fk key
    payment_id varchar(255), --uid
    amount bigint default 0,
    status varchar(255) default 'WAITING'
);
select create_distributed_table('payment', 'account_id', colocate_with => 'account');

