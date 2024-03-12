
USE imageDatabase;

CREATE TABLE nguoi_dung(
    nguoi_dung_id INT PRIMARY KEY NOT NULL,
    email VARCHAR(100) NOT NULL,
    mat_khau VARCHAR(10000) NOT NULL,
    ho_ten VARCHAR(100) NOT NULL,
    tuoi INT NOT NULL,
    anh_dai_dien VARCHAR(1000) NOT NULL,
    refresh_token VARCHAR(1000)
);

CREATE TABLE hinh_anh(
    hinh_id INT PRIMARY KEY NOT NULL,
    ten_hinh VARCHAR(100) NOT NULL,
    duong_dan VARCHAR(225) NOT NULL,
    mo_ta VARCHAR(225) NOT NULL,
    nguoi_dung_id INT NOT NULL
);

CREATE TABLE binh_luan(
    binh_luan_id INT PRIMARY KEY NOT NULL,
    nguoi_dung_id INT NOT NULL,
    hinh_id INT NOT NULL,
    ngay_binh_luan DATETIME NOT NULL,
    noi_dung VARCHAR(200) NOT NULL
);

CREATE TABLE luu_anh(
    nguoi_dung_id INT NOT NULL,
    hinh_id INT NOT NULL,
    ngay_luu DATETIME NOT NULL,
    PRIMARY KEY (nguoi_dung_id,hinh_id)
);

ALTER TABLE hinh_anh ADD CONSTRAINT fk_hinh_anh_nguoi_dung_id FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung (nguoi_dung_id) ON DELETE CASCADE;
ALTER TABLE binh_luan ADD CONSTRAINT fk_binh_luan_nguoi_dung_id FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung (nguoi_dung_id) ON DELETE CASCADE;
ALTER TABLE binh_luan ADD CONSTRAINT fk_binh_luan_hinh_id FOREIGN KEY (hinh_id) REFERENCES hinh_anh (hinh_id) ON DELETE CASCADE;
ALTER TABLE luu_anh ADD CONSTRAINT fk_luu_anh_nguoi_dung_id FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung (nguoi_dung_id) ON DELETE CASCADE;
ALTER TABLE luu_anh ADD CONSTRAINT fk_luu_anh_hinh_id FOREIGN KEY (hinh_id) REFERENCES hinh_anh (hinh_id) ON DELETE CASCADE;

ALTER TABLE hinh_anh ADD FULLTEXT ten_hinh_fulltext(ten_hinh)