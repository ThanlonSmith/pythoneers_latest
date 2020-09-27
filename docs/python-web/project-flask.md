![软件设计模式](../img/flask.jpeg)
#### 简单的每日代码统计系统

<hr>

##### 1. 系统截图

<hr>

##### 2. 技术栈
<hr>

##### 3. 表结构设计

<hr>

##### 4. 功能概要设计

<hr>

##### 5. 详细功能设计

<hr>

#### 简单的新闻内容管理系统
<hr>

##### 1. 系统截图
![](../img/project-flask/register.png)

![](../img/project-flask/login.png)

![](../img/project-flask/news_list.png)

![](../img/project-flask/change_page_num.png)

![](../img/project-flask/add_news.png)

![](../img/project-flask/edit_news.png)

![](../img/project-flask/delete_news.png)

![](../img/project-flask/logout.png)

<hr>

##### 2. 技术栈
数据库：MySQL

后端：Flask + WTForms + Flask_SQLAlchemy + pipreqs

前端：Bootstrap

<hr>

##### 3. 表结构设计
![](../img/project-flask/news_db.png)
```python
# coding:utf8
# @Time : 2020/7/2 上午1:27
# @Author : Erics
# @File : models.py
# @Software: PyCharm
from flask_sqlalchemy import SQLAlchemy  # pip install flask_sqlalchemy

from create_app import app

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:123456@localhost:3306/article_cms?charset=UTF8MB4"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
db = SQLAlchemy(app)


class User(db.Model):
    __tablename__ = "user"  # 指定表名，也可以不加这行代码SQLAlchemy会自动生成表名
    id = db.Column(db.Integer, primary_key=True)  # 编号
    name = db.Column(db.String(20), nullable=False, unique=True)  # 账号
    pwd = db.Column(db.String(100), nullable=False)  # 密码
    addtime = db.Column(db.DateTime, nullable=False)  # 注册时间


class Article(db.Model):
    __tablename__ = "article"
    id = db.Column(db.Integer, primary_key=True)  # 编号
    title = db.Column(db.String(100), nullable=False)  # 标题
    logo = db.Column(db.String(100), nullable=False)  # 封面
    content = db.Column(db.Text, nullable=False)  # 内容
    addtime = db.Column(db.DateTime, nullable=False)  # 发布时间
    user_id = db.Column(db.Integer, nullable=False)  # 作者id
    cate_id = db.Column(db.Integer, nullable=False)  # 分类id


class Cate(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # 编号
    title = db.Column(db.String(10), unique=True)  # 分类名称


if __name__ == '__main__':
    # 如果表已存在就不会再创建
    db.create_all()  # 创建所有的表
```
<hr>

##### 4. 功能概要设计
( 1 ) 用户注册

( 2 ) 用户登录

( 3 ) 新闻列表的展示

( 4 ) 新闻的编辑

( 5 ) 新闻的删除

( 6 ) 访问权限控制

( 5 ) 退出登录

<hr>

##### 5. 详细功能设计
( 1 ) 验证码的生成
```python
# coding:utf8
import os
import uuid
import random
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# 定义验证码功能
class Codes:
    # 随机一个字母或者数字
    def random_chr(self):
        num = random.randint(1, 3)
        if num == 1:
            # 随机一个0～9之间的数字
            char = random.randint(48, 57)
        elif num == 2:
            # 随机一个a~z之间的字母
            char = random.randint(97, 122)
        else:
            # 随机一个A~Z之间的字母
            char = random.randint(65, 90)
        return chr(char)

    # 随机一个干扰字符
    def random_dis(self):
        arr = ["^", "_", "-", ".", "~"]
        return arr[random.randint(0, len(arr) - 1)]

    # 定义干扰字符颜色，三原色，RGB，0～255
    def random_color1(self):
        return (random.randint(64, 255), random.randint(64, 255), random.randint(64, 255))

    # 定义字符颜色
    def random_color2(self):
        return (random.randint(32, 127), random.randint(32, 127), random.randint(32, 127))

    # 生成验证码
    def create_code(self):
        width = 240  # 240px
        height = 60  # 60px
        # 创建一个图片
        image = Image.new("RGB", (width, height), (255, 255, 255))
        # 创建font对象，定义字体和大小
        font_name = random.randint(1, 3)
        font_file = os.path.join(os.path.dirname(__file__), "static/fonts") + "/%d.ttf" % font_name
        font = ImageFont.truetype(font_file, 30)
        # 创建draw，填充像素点
        draw = ImageDraw.Draw(image)
        for x in range(0, width, 5):
            for y in range(0, height, 5):
                draw.point((x, y), fill=self.random_color1())
        # 填充干扰字符
        for v in range(0, width, 30):
            dis = self.random_dis()
            w = 5 + v
            # 距离图片上边距最多15个像素，最低5个像素
            h = random.randint(5, 15)
            draw.text((w, h), dis, font=font, fill=self.random_color1())
        # 填充字符
        chars = ""
        for v in range(4):
            c = self.random_chr()
            chars += str(c)
            # 随机距离图片上边距高度，最多15px，最低5px
            h = random.randint(5, 15)
            # 占图片宽度1/4，10px间隙
            w = width / 4 * v + 10
            draw.text((w, h), c, font=font, fill=self.random_color2())
        # 模糊效果
        image.filter(ImageFilter.BLUR)
        image_name = "%s.jpg" % uuid.uuid4().hex
        save_dir = os.path.join(os.path.dirname(__file__), "static/code")
        if not os.path.exists(save_dir):
            os.makedirs(save_dir)
        image.save(save_dir + "/" + image_name, "jpeg")
        return dict(
            img_name=image_name,
            code=chars
        )
```
```python
# 获取验证码
@app.route("/codes/", methods=["GET"])
def codes():
    c = Codes()
    info = c.create_code()  # info：{'img_name': image_name, 'code': chars}
    image = os.path.join(os.path.dirname(__file__), "static/code") + "/" + info["img_name"]
    """
    print(__file__) # /media/thanlon/存储盘/项目实施/开发/Flask/article_cms/views.py
    print(os.path.dirname(__file__))  # /media/thanlon/存储盘/项目实施/开发/Flask/article_cms
    print(os.path.join('1', '2', '3'))  # 1/2/3
    print(image)  # /media/thanlon/存储盘/项目实施/开发/Flask/article_cms/static/code/b8009fbaf8774adca4c6b1747b4f1f12.jpg
    """
    with open(image, mode='rb') as f:
        image = f.read()
    session["code"] = info["code"]
    return Response(image, mimetype='jpeg')  # images:字节类型,mimetype告诉浏览器以何种方式打开
```
( 2 ) 用户注册
```python
@app.route('/register/', methods=['GET', 'POST'])
def register():
    form = RegisterForm()
    if form.validate_on_submit():
        data = form.data  # 字典类型
        """
        print(data)  # {'name': 'thanlon', 'pwd': '123456', 're_pwd': '123456', 'verification_code': '4j28', 'submit': True, 'csrf_token': 'IjU1YTEwZDA3ZjQ5MTQ0NDM0MmM0MGVhNzMxMTJhZDNkMDQ0ODgwNDQi.XwH3wA.5SHm9PYdYZoiF8815FnRTcjfueo'}
        """
        user = User(
            name=data['name'],
            pwd=generate_password_hash(data['pwd']),
            # pwd：pbkdf2:sha256:150000$VpYqRoBN$e2da700d98fea88e57a19c5943523301ff74a03a9869fff1e4fe16af3f59edc0
            addtime=datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        )
        db.session.add(user)
        db.session.commit()
        flash("注册成功，请登录！", "ok")
        return redirect('/login/')
    return render_template("register.html", form=form)
```
( 3 ) 用户登录
```python
@app.route('/login/', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        data = form.data
        user = User.query.filter_by(name=data['name']).first()
        if not user:
            # 安全起见登录时候不要提示没有用户名，直接提示用户或密码错误就可以了
            flash("用户或密码错误！", "error")
        else:
            # 校验成功返回True，失败返回False
            if not check_password_hash(user.pwd, data['pwd']):
                flash("用户或密码错误！", "error")
            else:
                session["id"] = user.id
                session["user"] = data["name"]
                flash(f"{session.get('user')}已成功登录，欢迎您的使用！", "ok")
                return redirect('/article/list/1/')
    return render_template("login.html", form=form)
```
( 4 ) 新闻的添加
```python
@app.route('/article/add/', methods=['GET', 'POST'])
@user_login_decorator
def article_add():
    form = ArticleAddForm()
    if form.validate_on_submit():
        data = form.data
        """
        print(data) # {'title': 'test', 'cate': 1, 'logo': <FileStorage: '2020-07-04_19-54.png' ('image/png')>, 'content': '<p>test</p>', 'submit': True, 'csrf_token': 'IjU1YTEwZDA3ZjQ5MTQ0NDM0MmM0MGVhNzMxMTJhZDNkMDQ0ODgwNDQi.XwCFIA.IP3Cg1BU5SkFcsuuQhffdp3kWok'}
        print(data['logo'] ) # <FileStorage: '2020-07-04_19-54.png' ('image/png')>
        print(form.logo,type(form.logo)) # <input class="form-control-static" id="logo" name="logo" required type="file"> <class 'wtforms.fields.simple.FileField'>
        print(form.logo.data, type(form.logo.data)) # <FileStorage: '2020-07-04_19-54.png' ('image/png')> <class 'werkzeug.datastructures.FileStorage'>
        filename = secure_filename(form.logo.data.filename)
        print(filename,type(filename))  # 2020-07-04_19-54.png <class 'str'>
        print(form.logo.data.filename,type(form.logo.data.filename))# 2020-07-04_19-54.png <class 'str'>
        """
        filename = secure_filename(data['logo'].filename)
        new_filename = change_name(filename)
        """
        print(new_filename) # 20200704214223bac609e7af8b48bc85d0514b8ae17907.png
        """
        if not os.path.exists(app.config['UP']):
            os.makedirs(app.config['UP'])
        form.logo.data.save(app.config['UP'] + new_filename)
        user = User.query.filter_by(name=session['user']).first()  # <User 1> <class 'models.User'>
        article = Article(
            title=data['title'],
            cate_id=data['cate_id'],
            user_id=user.id,
            logo=new_filename,
            content=data['content'],
            addtime=datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        )
        db.session.add(article)
        db.session.commit()
        flash('发布成功！', category='ok')
    return render_template("article_add.html", form=form, title='发布新闻')
```
( 4 ) 新闻列表的展示
```python
@app.route('/article/list/<int:page>/', methods=['GET'])
@user_login_decorator
def article_list(page=None):
    if not page:
        page = 1
    cate = Cate.query.all()
    cate_id_name = [(i.id, i.title) for i in cate]
    cate_id_name.reverse()  # [(1, '科技'), (2, '社会')]
    user = User.query.filter_by(name=session.get('user')).first()
    page_data = Article.query.filter_by(
        user_id=user.id
    ).order_by(
        Article.addtime.desc()
    ).paginate(page=page, per_page=5)
    """
    articles = Article.query.all()
    print(articles, type(articles))  # [<Article 1>, <Article 2>] <class 'list'>
    for article in articles:
        print(article.logo)
    """
    return render_template("article_list.html", title='新闻列表', cate_id_name=cate_id_name, page_data=page_data)
```
( 5 ) 新闻的编辑
```python
@app.route('/article/edit/<int:id>/', methods=['GET', 'POST'])
@user_login_decorator
def article_edit(id):
    form = ArticleEditForm()
    """
    article = Article.query.filter_by(id=id)
    print(article)  # sql语句
    """
    article = Article.query.filter_by(id=id).first()  # <Article 5>
    if request.method == 'GET':
        form.title.data = article.title
        form.cate_id.data = article.cate_id
        form.content.data = article.content
        form.logo.data = article.logo
    if form.validate_on_submit():
        data = form.data
        """
        print(request.form)
        ImmutableMultiDict([('title', '2020年高考开考 五名全盲考生使用盲文试卷'), ('cate_id', '1'),,,])
        """
        new_filename = secure_filename(change_name(data['logo'].filename))
        try:
            # 标记旧的logo文件
            old_logo_filename = article.logo
            # 更新article中的字段
            article.title = data['title']
            article.cate_id = data['cate_id']
            article.logo = new_filename
            article.content = data['content']
            db.session.add(article)
            db.session.commit()
            # 删除旧的logo文件
            if os.path.exists(app.config['UP'] + old_logo_filename):
                os.remove(app.config['UP'] + old_logo_filename)
            # 保存新的logo文件
            data['logo'].save(app.config['UP'] + new_filename)
            flash('编辑成功！', category='ok')
        except Exception as e:
            print(e.args)
            flash('编辑失败！', category='error')
    return render_template("article_edit.html", form=form,
                           title='<a style="text-decoration:none" href="/article/list/1/">新闻列表</a> >> 编辑新闻',
                           article=article)
```
( 6 ) 新闻的删除
```python
@app.route('/article/del/<int:id>/', methods=['GET'])
@user_login_decorator
def article_del(id):
    # print(type(id))  # <class 'int'>
    Article.query.filter_by(id=id).delete()  # 删除的数据行数
    db.session.commit()
    flash('删除成功！', category='ok')
    return redirect('/article/list/1/')
```
( 7 ) 访问权限控制
```python
def user_login_decorator(foo):
    @wraps(foo)
    def user_login(*args, **kwargs):
        if not session.get('user'):
            return redirect(url_for('login', next=request.url))
        return foo(*args, **kwargs)

    return user_login
```
( 8 ) 退出登录
```python
@app.route(rule='/logout/', methods=['GET'])
@user_login_decorator
def logout():
    session.pop('user', None)  # 如果没有key(user)返回None
    return redirect('/login/')  # 302跳转到登录页面
```
<hr>

#### D5影视网
<hr>

##### 1. 系统截图

<hr>

##### 2. 技术栈
数据库：Redis、MySQL

后端：Flask + WTForms + Flask_SQLAlchemy + Flask_Session + Flask_Migrate + pipreqs

前端：Bootstrap + Jquery + AJAX

<hr>

##### 3. 表结构设计
![](../img/project-flask/d5-db.png)
```python
from app import db
from datetime import datetime


class User(db.Model):
    __tablename__ = "user"
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True)
    nickname = db.Column(db.String(100), unique=True)
    pwd = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)
    phone = db.Column(db.String(11), unique=True)
    info = db.Column(db.Text)  # 个性简介
    face = db.Column(db.String(255))  # 头像
    add_time = db.Column(db.DateTime, index=True, default=datetime.now)
    uuid = db.Column(db.String(255), unique=True)  # 唯一标识符

    user_logs = db.relationship('UserLog', backref='user')  # 会员日志外键关系关联
    comments = db.relationship('Comment', backref='user')  # 评论外键关系关联
    movie_cols = db.relationship('Moviecol', backref='user')  # 评论外键关系关联

    def check_pwd(self, pwd):
        from werkzeug.security import check_password_hash
        return check_password_hash(self.pwd, pwd)  # 如果是True代表验证成功


class UserLog(db.Model):
    __tablename__ = "user_log"
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)  # 编号
    ip = db.Column(db.String(100))  # 登陆IP
    add_time = db.Column(db.DateTime, default=datetime.now)  # 登录时间

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))  # 所属用户


class Comment(db.Model):
    __tablename__ = "comment"
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)  # 编号
    content = db.Column(db.Text)  # 内容
    add_time = db.Column(db.DateTime, default=datetime.now)  # 评论时间

    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'))  # 所属电影
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))  # 所属用户


class Moviecol(db.Model):
    __tablename__ = "movie_col"
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)  # 编号
    addtime = db.Column(db.DateTime, default=datetime.now)  # 评论时间

    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'))  # 所属电影
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))  # 所属用户


class Movie(db.Model):
    __tablename__ = "movie"
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)  # 标号
    title = db.Column(db.String(255), unique=True)  # 标题
    url = db.Column(db.String(255), unique=True)  # 地址
    info = db.Column(db.Text)  # 简介
    logo = db.Column(db.String(255), unique=True)  # 封面
    star = db.Column(db.SmallInteger)  # 星级
    play_num = db.Column(db.BigInteger)  # 表放量
    comment_num = db.Column(db.BigInteger)  # 评论量
    area = db.Column(db.String(255))  # 地区
    release_time = db.Column(db.Date)  # 上映时间
    length = db.Column(db.String(100))  # 播放时间
    add_time = db.Column(db.DateTime, default=datetime.now)

    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'))  # 所属标签
    comments = db.relationship("Comment", backref='movie')  # 电影外键关系关联
    movie_cols = db.relationship("Moviecol", backref='movie')  # 电影外键关系关联


class Tag(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)  # 编号
    name = db.Column(db.String(100), unique=True)  # 标题
    add_time = db.Column(db.DateTime, default=datetime.now)  # 添加时间

    movies = db.relationship("Movie", backref='tag')  # 电影外键关系关联


class Preview(db.Model):
    __tablename__ = "preview"
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)  # 编号
    title = db.Column(db.String(255), unique=True)  # 标题
    cover_picture = db.Column(db.String(255), unique=True)  # 封面
    add_time = db.Column(db.DateTime, default=datetime.now)  # 上映时间


class Role(db.Model):
    __tablename__ = "role"
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)  # 编号
    name = db.Column(db.String(100), unique=True)  # 角色名称
    auth = db.Column(db.String(600))  # 权限列表
    add_time = db.Column(db.DateTime, default=datetime.now)  # 角色添加时间
    admins = db.relationship('Admin', backref='role')


class Admin(db.Model):
    __tablename__ = "admin"
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)  # 编号
    name = db.Column(db.String(100), unique=True)  # 管理员账号
    pwd = db.Column(db.String(100))  # 管理员密码
    is_super = db.Column(db.SmallInteger)  # 是否为超级管理员，0为超级管理员
    add_time = db.Column(db.DateTime, index=True, default=datetime.now)  # 创建时间

    role_id = db.Column(db.Integer, db.ForeignKey('role.id'))  # 所属角色

    admin_logs = db.relationship("AdminLog", backref='admin')  # 外键关系关联
    op_logs = db.relationship("OpLog", backref='admin')  # 外键关系关联


class AdminLog(db.Model):
    __tablename__ = "admin_log"
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)  # 编号
    ip = db.Column(db.String(100))  # 登陆IP
    add_time = db.Column(db.DateTime, index=True, default=datetime.now)  # 登录时间

    admin_id = db.Column(db.Integer, db.ForeignKey('admin.id'))  # 所属管理员


class OpLog(db.Model):
    __tablename__ = "op_log"
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)  # 编号
    ip = db.Column(db.String(100))  # 登陆IP
    reason = db.Column(db.String(600))  # 操作原因
    add_time = db.Column(db.DateTime, default=datetime.now)  # 登录时间
    admin_id = db.Column(db.Integer, db.ForeignKey('admin.id'))  # 所属管理员


class Auth(db.Model):
    __tablename__ = "auth"
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)  # 编号add
    name = db.Column(db.String(100), unique=True)  # 权限名称
    url = db.Column(db.String(255), unique=True)  # 权限名称
    add_time = db.Column(db.DateTime, default=datetime.now)  # 添加时间
```
<hr>

##### 4. 功能概要设计

<hr>

##### 5. 详细功能设计

<hr>



<div style="width: 60px;height: auto;z-index: 99;bottom: 30%;position: fixed;right: 0" id="plug-ins">
    <div style="position: relative;float: right">
        <a target="" href="javascript:;" id="weibo"
           style="display: block;width: 40px;height: 40px;background-color: #c4351b;margin-top: 1px;">
            <img width="22" height="20" src="../img/weibo.png" alt=""
                 style="margin-top: 10px;margin-left: 9px">
        </a>
         <a target="_blank" href="http://sighttp.qq.com/authd?IDKEY=5838160dbeb2a49f264d5e2d13d6336248d74a60cf56ecad" id="qq" style="display: block;width: 40px;height: 40px;background-color:#0e91e8;margin-top: 1px">
            <img width="20" height="20" src="../img/qq.png" 
                 style="margin-top: 10px;margin-left: 10px" alt="点击这里给我发消息" title="点击这里给我发消息">
        </a>
        <a href="javascript:" id="wechat"
           style="display: block;width: 40px;height: 40px;background-color:#01b901;margin-top:1px">
            <img width="22" height="20" src="../img/wechat.png"
                 style="margin-top: 10px;margin-left: 9px">
        </a>
        <a href="javascript:" id="go_top"
           style="display: none;width: 40px;height: 40px;background-color: #b5b5b5;margin-top: 1px">
            <img width="22" height="20" src="../img/top.png" alt=""
                 style="margin-top: 10px;margin-left: 9px">
        </a>
    </div>
</div>

<div style="width: auto;height: auto;z-index: 99;position: fixed;left: 0;bottom: 0;" id="support_us" hidden="hidden">
        <div id="alipei_and_wechat">
            <button type="button" class="close"><span aria-hidden="true">&times;</span></button>
            <img class="img-responsive" width="180px" height="" src="../img/public/33659FBDE4AF3F7A005E17D9BA173D04.jpg" alt="..."><br>
            <img class="img-responsive" width="180px" height="" src="../img/public/B37F6EA6DF3F4C1CA0A65C0E80AE131E.jpg" alt="...">
        </div>
</div>