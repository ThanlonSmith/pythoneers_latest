![软件设计模式](../img/flask.jpeg)

<span class="github-btn github-stargazers pull-right">
<a class="gh-btn" href="https://github.com/ThanlonSmith/daily-code-statistics.git" rel="noopener noreferrer" target="_blank" aria-label="">
    <span class="gh-ico" aria-hidden="true"></span> 
    <span class="gh-text">Star</span> 
</a>
</span>

#### 每日代码统计系统
<hr>

##### 1. 系统截图

![用户登录](../img/project-flask/daily-code-statistics/daily-code-statistics-login.png)

![用户列表](../img/project-flask/daily-code-statistics/daily-code-statistics-userlist.png)

![提交代码](../img/project-flask/daily-code-statistics/daily-code-statistics-upload_code.png)

![提交代码记录](../img/project-flask/daily-code-statistics/daily-code-statistics-code_record.png)

<hr>

##### 2. 技术栈
数据库：MySQL

后端：Flask + DBUtils + PyMySQL + pipreqs + Werkzeug

前端：HTML + JavaScript + Jquery + Bootstrap

<hr>

##### 3. 表结构设计
![提交代码记录](../img/project-flask/daily-code-statistics/daily-code-statistics-db.png)

![提交代码记录](../img/project-flask/daily-code-statistics/daily-code-statistics-table1.png)

![提交代码记录](../img/project-flask/daily-code-statistics/daily-code-statistics-table2.png)

<hr>

##### 4. 功能概要设计
( 1 ) 用户登录

( 2 ) 退出登录

( 3 ) 用户列表展示

( 4 ) 上传代码

( 5 ) 代码提交记录可视化

( 6 ) 用户访问权限控制

<hr>

##### 5. 详细功能设计
( 1 ) 用户登录
```python
@home.route('/user/login/', methods=['get', 'post'])
def user_login():
    if request.method == 'POST':
        user = request.form.get('user', None)
        pwd = request.form.get('pwd', None)
        print(user, pwd)
        if user and pwd:
            ret = db_helper.fetchone('select *from userinfo where user=%s and pwd=%s', (user, md5.md5(pwd)))
            print(ret)  # {'id': 1, 'user': 'thanlon', 'pwd': 'ea48576f30be1669971699c09ad05c94', 'nickname': 'thanlon'}
            if not ret:
                flash('用户名或者密码错误', 'error')
                return render_template('home/login.html')
            # session['user_id'] = ret['id']
            # session['user_nickname'] = ret['nickname']
            # session['user_info'] = {'user_id': ret['id'], 'user_nickname': ret['nickname']}
            session['user_info'] = ret
            flash('欢迎进入系统！', 'ok')
            return redirect('/')

    return render_template('home/login.html')
```
( 2 ) 退出登录
```python
# 退出加装饰器可以不用执行退出逻辑代码，直接退出到登录页面
@home.route('/user/logout/')
@login_wrapper
def user_logout():
    print(session, type(session))
    if session.get('user_info'):
        del session['user_info']
    """
    if 'user_info' in session:
        del session['user_info']
    """
    return redirect(url_for('home.user_login', next=request.url))
```
( 3 ) 用户列表展示
```python
@home.route('/')
def index():
    return redirect(url_for('home.user_list', page=1))


@home.route('/user/list/<int:page>/', methods=["GET"])
@login_wrapper
def user_list(page=None):
    if request.method == 'GET':
        per_page = 2  # 每页显示多少条
        # ret = db_helper.fetch_all('select id,user ,nickname from userinfo', ())
        data_list = db_helper.fetch_all('select id,user ,nickname from userinfo limit %s,%s ',
                                        (((page - 1) * per_page), per_page))
        """
         print(data_list)
        [{'id': 1, 'user': 'thanlon', 'nickname': 'thanlon'}, {'id': 2, 'user': 'kiku', 'nickname': 'kiku'}]
        """
        data = db_helper.fetch_all('select id,user ,nickname from userinfo', None)
        sum_count = len(data)  # 总记录数
        if sum_count <= per_page:
            page_num_count = 1
        else:
            if sum_count % per_page == 0:
                page_num_count = sum_count // 1
            else:
                page_num_count = sum_count // 1 + 1

    return render_template('home/index.html', data_list=data_list, page_num_count=page_num_count, page=page)
```
( 4 ) 上传代码
```python
def check_upload():
    """
    判断今天的代码是否上传
    :return:
    """
    ctime = datetime.date.today()  # 当前日期
    data = db_helper.fetchone('select id from record where ctime = %s and user_id = %s',
                              (ctime, session['user_info']['id']))
    return data


def get_code_line(target_path):
    """
    4. 遍历目录下的所有文件，计算有效代码行数
    :param target_path:
    :return:
    """
    # for item in os.listdir(target_path):
    #     print(item)
    # for item in os.walk(target_path):
    #     # 每一个item是一个元组，每一个元组有三个元素，分别是当前路径、当前路径下所有文件夹、当前路径下的所有文件
    #      print(item)  # ('files/79d81a3d-455f-4124-ba24-7d7b8a990c4a/keymaps', [], ['Default Proper Redo.xml'])
    sum_num = 0
    for base_path, folder_list, file_list in os.walk(target_path):
        for file_name in file_list:
            file_path = os.path.join(base_path, file_name)
            # print(file_path)  # files/b39a2b87-69b3-4094-942a-58103e70b8a6/options/databaseDrivers.xml
            file_ext = file_path.rsplit('.', 1)
            if len(file_ext) != 2:
                continue
            if file_ext[1] != 'py':
                continue
            file_num = 0
            with open(file_path, 'rb') as f:
                for line in f:
                    line = line.strip()
                    if not line:
                        continue
                    if line.startswith(b'#'):
                        continue
                    file_num += 1
            # print(file_num, file_path)  # 每一个文件行数
            sum_num += file_num
            return sum_num


@home.route('/code/upload/', methods=['POST', 'GET'])
@login_wrapper
def code_upload():
    if request.method == "POST":
        if check_upload():
            flash('今天的代码已经上传了！', 'error')
            return render_template('home/upload_code.html')
        file_obj = request.files.get('code')  # <FileStorage: '' ('application/octet-stream')>,把上传的东西方内存了
        # print(file_obj.filename)  # 上传的文件名(带扩展名)
        # print(file_obj.stream)  # 文件的内容被封装到对象中
        """
        1.检查上传文件的后缀名
        """
        filename_ext = file_obj.filename.rsplit('.', maxsplit=1)  # 元组
        msg = str()
        if len(filename_ext) != 2:
            msg = '请上传压缩文件!'
            return render_template('home/upload_code.html', msg=msg)
        if filename_ext[1] != 'zip':
            msg = '请上传后缀名为zip的文件'
            return render_template('home/upload_code.html', msg=msg)

        """
        2.接受用户上传的文件并写入到本地
        """
        if not os.path.exists('files'):
            os.mkdir('files')  # 项目目录下，非app目录下
        file_path = os.path.join('files', file_obj.filename)
        file_obj.save(file_path)  # save的本质是：从file_obj.stream中读取内容写入到文件
        """
        3.解压zip文件
        """
        import shutil
        target_path = os.path.join('files', str(uuid.uuid4()))  # 允许上传的文件名相同
        # print(target_path) # files/549fb0e2-924c-460d-a993-935fcc8e3274
        # 通过open打开压缩文件，读取内容再进行解压
        shutil._unpack_zipfile(file_path, target_path)

        # 2和3步合并，接受用户上传的文件，并解压至指定目录
        # import shutil
        # shutil._unpack_zipfile(file_obj.stream, r'/home/thanlon/PycharmProjects/code_count/files')
        """
        5. 持久化到数据库
        """
        ctime = datetime.date.today()
        db_helper.insert('insert record(line,ctime,user_id) values(%s,%s,%s)',
                         (get_code_line(target_path), ctime, session['user_info']['id']))
        flash('上传成功！', 'ok')
    return render_template('home/upload_code.html')
```
( 5 ) 代码提交记录可视化
```python
@home.route('/record/<int:id>/<int:page>/')
@login_wrapper
def commit_record(id=None, page=None):
    print(session)
    """
    <SecureCookieSession {'user_info': {'id': 1, 'nickname': 'thanlon', 'pwd': 'ea48576f30be1669971699c09ad05c94', 'user': 'thanlon'}}>
    """
    print(session['user_info'])
    """
    {'id': 1, 'nickname': 'thanlon', 'pwd': 'ea48576f30be1669971699c09ad05c94', 'user': 'thanlon'}
    """
    print(session['user_info'].get('id', None))  # 通过页码传用户的id和直接从session获取一样
    record_list = db_helper.fetch_all(
        'select id,line,ctime from record  where user_id = %s order by ctime asc limit 0,5', (id,))
    print(record_list)
    data_list, time_list = list(), list()
    for row in record_list:
        data_list.append(row['line'])
        time_list.append(float(row['ctime'].strftime("%m.%d")))  # datetime类型转换成字符串
    print(data_list)
    print(time_list)
    """
    [135, 897, 1032, 374, 678]
    [9.26, 9.25, 9.27, 9.24, 9.23]
    """
    return render_template('home/commit_record.html', data_list=data_list, time_list=time_list, record_list=record_list)
```
( 6 ) 用户访问权限控制
```python
from flask import session, redirect, url_for, request
from functools import wraps


def login_wrapper(fuc):
    @wraps(fuc)
    def inner(*args, **kwargs):
        if not session.get('user_info'):
            # return redirect('/user/login/?next={}'.format(request.url))
            return redirect(url_for('home.user_login', next=request.url))
        return fuc(*args, **kwargs)

    return inner
```
<hr>

<span class="github-btn github-stargazers pull-right">
<a class="gh-btn" href="https://github.com/ThanlonSmith/news_cms.git" rel="noopener noreferrer" target="_blank" aria-label="">
    <span class="gh-ico" aria-hidden="true"></span> 
    <span class="gh-text">Star</span> 
</a>
</span>

#### 新闻内容管理系统
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

后端：Flask + WTForms + Flask_SQLAlchemy + Pillow + PyMySQL + pipreqs + Werkzeug

前端：HTML +JavaScript + Jquery + Bootstrap

<hr>

##### 3. 表结构设计
![](../img/project-flask/news_cms/news_db.png)

![](../img/project-flask/news_cms/news-cms-db_user.png)

![](../img/project-flask/news_cms/news-cms-db_cate.png)

![](../img/project-flask/news_cms/news-cms-db_article.png)

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

<span class="github-btn github-stargazers pull-right">
<a class="gh-btn" href="https://github.com/ThanlonSmith/d5_video.git" rel="noopener noreferrer" target="_blank" aria-label="">
    <span class="gh-ico" aria-hidden="true"></span> 
    <span class="gh-text">Star</span> 
</a>
</span>

#### D5影视网

<hr>

##### 1. 系统截图
![](../img/project-flask/d5video/d5-front-end-index.png)

![](../img/project-flask/d5video/d5-fore-end-user_center.png)

![](../img/project-flask/d5video/d5-back-end.png)

<hr>

##### 2. 技术栈
数据库：Redis、MySQL

后端：Flask + WTForms + Flask_SQLAlchemy  + Flask_Session + redis + flask_script + Flask_Migrate + pipreqs + Werkzeug

前端：HTML + JavaScript + AJAX + Bootstrap 

<hr>

##### 3. 表结构设计
![](../img/project-flask/d5video/d5-db.png)

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
    admin_id = db.Column(db.Integer, db.ForeignKey('admin.id'))  # 所属用户


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
    addtime = db.Column(db.DateTime, default=datetime.now)  # 收藏时间
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

    admin_logs = db.relationship("UserLog", backref='admin')  # 外键关系关联
    op_logs = db.relationship("OpLog", backref='admin')  # 外键关系关联

    def check_pwd(self, pwd):
        from werkzeug.security import check_password_hash
        return check_password_hash(self.pwd, pwd)  # 如果是True代表验证成功


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
( 1 ) 前台用户注册登录

( 2 ) 前台电影搜索

( 3 ) 前台预告和电影列表

( 4 ) 前台电影播放

( 5 ) 前台电影收藏

( 6 ) 前台电影评论

( 7 ) 前台用户基本信息修改

( 8 ) 前台用户密码修改

( 9 ) 前台用户评论记录

( 10 ) 前台用户登录日志

( 11 ) 前台用户收藏列表

( 12 ) 后台管理员登录

( 13 ) 后台管理员管理

( 14 ) 后台登录日志管理

( 15 ) 后台用户管理

( 16 ) 后台电影管理

( 17 ) 后台电影预告管理

( 18 ) 后台电影收藏管理

( 19 ) 后台电影标签管理

( 20 ) 后台电影评论管理

( 21 ) 后台管理员角色管理

( 22 ) 后台管理员权限管理

( 23 ) 前后台访问权限控制

<hr>

##### 5. 详细功能设计
( 1 ) 前台用户注册登录
```python
# 会员注册
@home.route("/register/", methods=['GET', 'POST'])
def register():
    form = RegisterForm()
    if request.method == 'POST':
        if form.validate_on_submit():
            data = form.data
            user = User(
                name=data["name"],
                nickname=data['name'],
                email=data["email"],
                phone=data["phone"],
                pwd=generate_password_hash(data["pwd"]),
                uuid=uuid.uuid4().hex,
                face='default.jpeg',
            )
            # print(users)  # <User (transient 140110428913776)>
            db.session.add(user)
            db.session.commit()
            db.session.remove()
            flash("注册成功，开始登录吧！", "ok")
            return redirect(url_for('home.login', next=request.url))
    return render_template('home/register.html', form=form)


# 会员登录
@home.route("/login/", methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if request.method == "POST":
        if form.validate_on_submit():
            data = form.data
            user = User.query.filter_by(name=data["name"]).first()
            if not user or not user.check_pwd(data["pwd"]):
                flash("账号或密码错误！", "err")
                return redirect(url_for("home.login", next=request.url))
            session["user"] = user.name
            session["user_id"] = user.id
            session['face'] = user.face
            user_log = UserLog(
                user_id=user.id,
                ip=request.remote_addr
            )
            db.session.add(user_log)
            db.session.commit()
            db.session.remove()
            return redirect(url_for("home.index"))
    return render_template('home/login.html', form=form)


# 退出登录(接口调用)
@home.route("/api/v1/user/logout/")
def logout():
    ret = {'status': 1, 'msg': None}
    try:
        if session.get('user') and session.get('user_id'):
            session.pop('user', None)
            session.pop('user_id', None)
    except Exception as e:
        ret['status'] = 0
        ret['msg'] = '退出失败！'
    return jsonify(ret)
```
( 2 ) 前台电影搜索
```python
# 搜索电影
@home.route("/movie/search/<int:page>/")
def movie_search(page=None):
    if page is None:
        page = 1
    key = request.args.get("key", "")
    movie_count = models.Movie.query.filter(
        models.Movie.title.ilike('%' + key + '%')
    ).count()
    page_data = models.Movie.query.filter(
        models.Movie.title.ilike('%' + key + '%')
    ).order_by(
        models.Movie.add_time.desc()
    ).paginate(page=page, per_page=10)
    return render_template("home/movie_search.html", page=page, key=key, page_data=page_data, movie_count=movie_count)
```
( 3 ) 前台预告和电影列表
```python
@home.route('/movie/<int:page>/')
def movie_list(page=None):
    # 预告
    preview_data = Preview.query.all()
    # print(preview_data)  # [<Preview 17>]
    first_preview_id = Preview.query.order_by(Preview.id.asc()).first().id  # <Preview 17>
    # first_preview_id = Preview.query.order_by(Preview.id.asc())  # sql
    # print(first_preview_id.id)
    # 电影列表
    page_date = Movie.query.order_by(Movie.add_time.desc()).paginate(page=page,per_page=12)
    # print(page_date)
    return render_template('home/index.html', preview_data=preview_data, first_preview_id=first_preview_id,
                           page_date=page_date)
```
( 4 ) 前台电影播放
```python
# 电影播放
@home.route("/movie/play/<int:id>.html", methods=["GET", "POST"])
def movie_play(id=None):
    movie = models.Movie.query.filter_by(id=id).first_or_404()

    movie.play_num += 1
    db.session.add(movie)
    db.session.commit()
    db.session.remove()
    movie = models.Movie.query.filter_by(id=id).first_or_404()
    comment_count = models.Comment.query.join(
        models.Movie
    ).filter(
        models.Comment.movie_id == models.Movie.id,
        models.Movie.id == id
    ).count()
    # print(comment_count)
    return render_template('home/movie_play.html', movie=movie, comment_count=comment_count)
```
( 5 ) 前台电影收藏
```python
# 添加收藏
@home.route("/moviecol/add/", methods=["GET", 'POST'])
def moviecol_add():
    user_id = request.args.get("user_id", "")
    movie_id = request.args.get("movie_id", "")
    moviecol = models.Moviecol.query.filter_by(
        user_id=user_id,
        movie_id=movie_id
    ).count()
    data = dict()
    if moviecol == 1:
        data = dict(ok=0)

    if moviecol == 0:
        moviecol = models.Moviecol(
            user_id=user_id,
            movie_id=movie_id
        )
        db.session.add(moviecol)
        db.session.commit()
        data = dict(ok=1)
    return jsonify(data)
```
```python
# 取消收藏
@home.route("/moviecol/del/", methods=["GET", 'POST'])
def moviecol_cancel():
    user_id = request.args.get("user_id", "")
    movie_id = request.args.get("movie_id", "")
    moviecol = models.Moviecol.query.filter_by(user_id=user_id, movie_id=movie_id).first_or_404()
    # print(moviecol)
    data = dict(ok=0)  # {'ok': 0}表示取消失败
    if moviecol:
        db.session.delete(moviecol)
        db.session.commit()
        db.session.remove()
        data = dict(ok=1)  # {'ok': 1}表示取消成功
    return jsonify(data)
```
```python
# 电影收藏状态(接口调用)
@home.route('/api/moviecol/status/')
def get_moviecol_status():
    user_id = request.args.get("user_id", "")
    movie_id = request.args.get("movie_id", "")
    moviecol = models.Moviecol.query.filter_by(
        user_id=user_id,
        movie_id=movie_id
    ).count()
    if moviecol == 1:
        data = dict(ok=1)  # {'ok': 1}表示已经收藏
    else:
        data = dict(ok=0)
    return jsonify(data)
```
( 6 ) 前台电影评论
```python
# 添加评论(接口调用)
@home.route('/movie/comment/add/', methods=['POST'])
@user_login_decorator
def comment_add():
    ret = {'status': True, 'msg': None}
    try:
        # all = request.form  # ImmutableMultiDict([('comment_content', '你好'), ('user_id', '1'), ('movie_id', '3')])
        comment_content = request.form['comment_content']
        if len(comment_content) == 0:
            ret['status'] = False
            ret['msg'] = '评论内容不能为空！'
            return jsonify(ret)
        # print(comment_content, type(comment_content))  # 你好 <class 'str'>
        user_id = request.form['user_id']  # <class 'str'> 数据库是int，这里不使用int也可以
        movie_id = request.form['movie_id']  # <class 'str'>
        comment = Comment(
            content=comment_content,
            user_id=user_id,
            movie_id=movie_id
        )
        db.session.add(comment)
        db.session.commit()
        db.session.remove()
    except Exception as e:
        ret['status'] = False
        ret['msg'] = str(e)
        # ret['msg'] = '删除失败'
    return jsonify(ret)
```
```python
# 评论列表(接口调用)
@home.route('/movie/comment/list/', methods=['GET'])
def show_movie_comment(page=None):
    if not None:
        page = 1
    ret = {'status': True, 'msg': None}
    try:
        movie_id = request.args.get('movie_id')  # <class 'str'>
        movie_comment_obj_list_page_data = Comment.query.join(
            User
        ).join(
            Movie
        ).filter(
            Movie.id == Comment.movie_id,
            User.id == Comment.user_id,
            Movie.id == movie_id
        ).order_by(
            Comment.add_time.desc()
        ).paginate(page=page, per_page=8)
        # 加不加all()都可以
        ret['user'] = []
        for obj in movie_comment_obj_list_page_data.items:
            # print(obj.user.face)  # 202007162204485797a85fb89d4360a3e1fd63660105c8.jpg
            # print(obj.content)  # 太好看了！
            ret['user'].append({'username': obj.user.name, 'face': obj.user.face, 'movie_comment': obj.content,
                                'add_time': str(obj.add_time)})
            # ret['user']['face'].append(obj.user.face)
            # ret['user']['movie_comment'].append(obj.content)

    except Exception as e:
        print(e)  # Entity '<class 'app.models.User'>' has no property 'movie_id'
        ret['status'] = False
        ret['msg'] = str(e)  # Entity '<class 'app.models.User'>' has no property 'movie_id'
        ret['msg'] = '获取评论列表失败！'
    """
    import json
    print(json.dumps(ret))  # {"status": true, "msg": null, "user": {"face": "202007162204485797a85fb89d4360a3e1fd63660105c8.jpg", "comment_content": "\u592a\u597d\u770b\u4e86\uff01"}}
    print(jsonify(ret))  # <Response 151 bytes [200 OK]>
    """
    jsonify(ret)
    print(
        ret)  # {'status': True, 'msg': None, 'user': {'face': '202007162204485797a85fb89d4360a3e1fd63660105c8.jpg', 'comment_content': '太好看了！'}}
    return jsonify(ret)
```
( 7 ) 前台用户基本信息修改
```python
# 修改会员基本资料
@home.route("/users/", methods=["GET", "POST"])
@user_login_decorator
def user():
    form = UserDetailForm()
    user = User.query.get(int(session["user_id"]))  # User.query.filter_by(id=session['user_id']).first()
    # print(users)  # <User 1>
    if request.method == "GET":
        form.name.data = user.name
        form.nickname.data = user.nickname
        form.email.data = user.email
        form.phone.data = user.phone
        form.info.data = user.info
    if form.validate_on_submit():
        data = form.data
        # 上传了头像会才会更新头像，没有上传不操作。图片支持中文名称
        if data['face']:
            if not os.path.exists(app.config["FACE_DIR"]):
                os.makedirs(app.config["FACE_DIR"])
            file_face = secure_filename(data['face'].filename)  # form.face.data <=> data['face']
            user.face = change_filename(file_face)  # 20200715164138eb5b145ddee1494a8c5d00dd1bb617c4.jpeg
            data['face'].save(app.config["FACE_DIR"] + user.face)
            if os.path.exists(app.config['FACE_DIR'] + session['face']):
                os.remove(app.config['FACE_DIR'] + session['face'])
        nickname_count = User.query.filter_by(nickname=data["nickname"]).count()
        if nickname_count == 1 and data["nickname"] != user.nickname:
            flash("昵称已存在！", "err")
            return redirect(url_for("home.user"))
        email_count = User.query.filter_by(email=data["email"]).count()
        if email_count == 1 and data["email"] != user.email:
            flash("邮箱已存在！", "err")
            return redirect(url_for("home.user"))
        phone_count = User.query.filter_by(phone=data["phone"]).count()
        if phone_count == 1 and data["phone"] != user.phone:
            flash("手机号码已存在！", "err")
            return redirect(url_for("home.user"))
        user.nickname = data["nickname"]
        user.email = data["email"]
        user.phone = data["phone"]
        user.info = data["info"]
        db.session.add(user)
        db.session.commit()
        db.session.remove()
        user = User.query.get(int(session["user_id"]))
        session['face'] = user.face
        flash("保存成功！", "ok")
        return redirect(url_for("home.user"))
    return render_template("home/user.html", form=form, user=user)
```
( 8 ) 前台用户密码修改
```python
# 修改密码
@home.route("/pwd/", methods=["GET", "POST"])
@user_login_decorator
def pwd():
    form = PwdForm()
    if form.validate_on_submit():
        data = form.data
        if data['old_pwd'] == data['new_pwd']:
            flash('新旧密码相同，系统不做修改！', 'err')
            return redirect(url_for('home.pwd'))
    return render_template('home/pwd.html', form=form)
```
( 9 ) 前台用户评论记录
```python
# 评论记录
@home.route("/comment/list/<int:page>/", methods=["GET"])
@user_login_decorator
def comment_list(page=None):
    page_data = models.Comment.query.order_by(
        models.Comment.add_time.desc()
    ).filter_by(
        user_id=session.get('user_id')
    ).paginate(page=page, per_page=10)
    print(page_data)
    return render_template('home/comment.html', page_data=page_data)
```
( 10 ) 前台用户登录日志
```python
# 登陆日志
@home.route("/loginlog/list/<int:page>/", methods=["GET"])
@user_login_decorator
def login_log(page=None):
    # UserLog.query.filter_by(user_id=session.get('user_id'))：sql语句
    # UserLog.query.filter_by(user_id=session.get('user_id')).first()：<UserLog 1>
    # filter_by和order_by部分先后顺序
    if not page:
        page = 1
    page_data = UserLog.query.order_by(
        UserLog.add_time.desc()
    ).filter_by(
        user_id=session.get('user_id')
    ).paginate(page=page, per_page=10)
    return render_template('home/login_log.html', page_data=page_data)
```
( 11 ) 前台用户收藏列表
```python
# 用户收藏的视频列表
@home.route("/moviecol/list/<int:page>/")
@user_login_decorator
def moviecol_list(page=None):
    page_data = models.Moviecol.query.join(
        models.User
    ).filter(
        models.Moviecol.user_id == models.User.id,
        # models.User.id == session.get('user_id'),
        models.Moviecol.user_id == session.get('user_id')
    ).order_by(
        models.Moviecol.addtime.desc()
    ).paginate(page=page, per_page=10)
    print(page_data.items)
    return render_template('home/moviecol.html', page_data=page_data)
```
( 12 ) 后台管理员登录
```python
# 登录
@admin.route("/login/", methods=["GET", "POST"])
def login():
    form = AdminLoginForm()
    if request.method == "POST":
        if form.validate_on_submit():
            data = form.data
            # print(data["name"])
            # print(data["pwd"])
            admin = models.Admin.query.filter_by(name=data["name"]).first()
            # print(admin.check_pwd(data['pwd']))
            if not admin or \
                    not admin.check_pwd(data["pwd"]):
                flash("账号或密码错误！", "err")
                return redirect(url_for("admin.login", next=request.url))
            session["admin"] = admin.name
            session["admin_id"] = admin.id
            # session['face'] = admin.face
            admin_log = models.UserLog(
                admin_id=admin.id,
                ip=request.remote_addr
            )
            db.session.add(admin_log)
            db.session.commit()
            db.session.remove()
            return redirect(url_for("admin.index"))
    return render_template('admin/login.html', form=form)


# 退出登录
@admin.route("/logout/")
@admin_login_decorator
def logout():
    if session.get('admin') and session.get('admin_id'):
        session.pop('admin', None)
        session.pop('admin_id', None)
    return redirect(url_for('admin.login'))
```
( 13 ) 后台管理员管理
```python
# 添加管理员
@admin.route("/administrator/add/", methods=["GET", "POST"])
@admin_login_decorator
def admin_add():
    form = AdminForm()
    if form.validate_on_submit():
        data = form.data
        admin = models.Admin(
            name=data["name"],
            pwd=generate_password_hash(data["pwd"]),
            role_id=data["role_id"],
            is_super=1  # 非超级管理员均为1
        )
        db.session.add(admin)
        db.session.commit()
        db.session.remove()
        flash("管理员添加成功！", "ok")
    return render_template('admin/admin_add.html', form=form)


# 管理员列表
@admin.route("/administrator/list/<int:page>/", methods=["GET"])
@admin_login_decorator
def admin_list(page=None):
    page_data = models.Admin.query.paginate(page=page, per_page=10)
    return render_template('admin/admin_list.html', page_data=page_data)


# 管理员删除
@admin.route("/del/<int:id>/", methods=["GET", "POST"])
@admin_login_decorator
def admin_del(id=None):
    admin = models.Admin.query.filter_by(id=id).first_or_404()
    db.session.delete(admin)
    db.session.commit()
    db.session.remove()
    return redirect(url_for('admin.admin_list', page=1))
```
( 14 ) 后台登录日志管理
```python
# 管理员登录日志
@admin.route("/loginlog/list/<int:page>/", methods=["GET"])
@admin_login_decorator
def admin_loginlog_list(page=None):
    page_data = models.UserLog.query.join(
        models.Admin
    ).filter(
        models.UserLog.admin_id == models.Admin.id
    ).order_by(
        models.UserLog.add_time.desc()
    ).paginate(page=page, per_page=10)
    # print(page_data.items)#[<UserLog 60>, <UserLog 59>, <UserLog 58>, <UserLog 57>, <UserLog 56>, <UserLog 55>, <UserLog 54>, <UserLog 53>, <UserLog 52>, <UserLog 51>]
    return render_template('admin/admin_loginlog_list.html', page_data=page_data)
```
```python
# 用户登录日志
@admin.route("/user/loginlog/list/<int:page>/", methods=["GET"])
@admin_login_decorator
def user_loginlog_list(page=None):
    if not page:
        page = 1
    page_data = models.UserLog.query.join(
        models.User
    ).filter(
        models.UserLog.user_id == models.User.id
    ).order_by(
        models.UserLog.add_time.desc()
    ).paginate(page=page, per_page=10)
    # print(page_data.items)#[<UserLog 60>, <UserLog 59>, <UserLog 58>, <UserLog 57>, <UserLog 56>, <UserLog 55>, <UserLog 54>, <UserLog 53>, <UserLog 52>, <UserLog 51>]
    return render_template('admin/user_loginlog_list.html', page_data=page_data)
```
( 15 ) 后台用户管理
```python
# 会员列表
@admin.route("/user/list/<int:page>/", methods=["GET"])
@admin_login_decorator
def user_list(page=None):
    if not page:
        page = 1
    page_data = models.User.query.order_by(models.User.add_time.desc()).paginate(page=page, per_page=10)
    return render_template('admin/user_list.html', page_data=page_data)
```
( 16 ) 后台电影管理
```python
# 添加电影
@admin.route("/movie/add/", methods=["GET", "POST"])
@admin_login_decorator
def movie_add():
    form = MovieForm()
    if form.validate_on_submit():
        data = form.data
        # file_url = secure_filename(form.url.data.filename)
        file_url = secure_filename(data['url'].filename)
        file_logo = secure_filename(data['logo'].filename)
        # 创建电影资源存放目录
        if not os.path.exists(app.config["MOVIE_DIR"]):
            os.makedirs(app.config["MOVIE_DIR"])
        # 创建电影资源封面存放目录
        if not os.path.exists(app.config["MOVIE_LOGO_DIR"]):
            os.makedirs(app.config["MOVIE_LOGO_DIR"])
        url = change_filename(file_url)
        logo = change_filename(file_logo)
        form.url.data.save(app.config["MOVIE_DIR"] + url)
        form.logo.data.save(app.config["MOVIE_LOGO_DIR"] + logo)
        movie = Movie(
            title=data["title"],
            url=url,
            info=data["info"],
            logo=logo,
            star=int(data["star"]),
            play_num=0,
            comment_num=0,
            tag_id=int(data["tag_id"]),
            area=data["area"],
            release_time=data["release_time"],
            length=data["length"]
        )
        db.session.add(movie)
        db.session.commit()
        db.session.remove()
        flash("添加电影成功！", "ok")
        return redirect(url_for('admin.movie_add'))
    return render_template("admin/movie_add.html", form=form)
```
```python
# 电影列表
@admin.route("/movie/list/")
@admin_login_decorator
def movie_list(page=None):
    if not page:
        page = 1
    # page_data = Movie.query.order_by(Movie.add_time.desc()).paginate(page=page, per_page=10)
    page_data = Movie.query.join(Tag).filter(
        Movie.tag_id == Tag.id
    ).order_by(Movie.add_time.desc()).paginate(page=page, per_page=10)
    # print(page_data.items)
    return render_template("admin/movie_list.html", page_data=page_data)
```
( 17 ) 后台电影预告管理
```python
# 添加电影预告
@admin.route("/preview/add/", methods=["POST", "GET"])
@admin_login_decorator
def preview_add():
    form = PreviewForm()
    if form.validate_on_submit():
        data = form.data
        try:
            if not os.path.exists(app.config['PREVIEW_DIR']):
                os.mkdir(app.config['PREVIEW_DIR'])
            cover_picture = secure_filename(data['cover_picture'].filename)  # 不支持中文名的图片
            new_cover_picture = secure_filename(change_filename(cover_picture))
            data['cover_picture'].save(app.config['PREVIEW_DIR'] + new_cover_picture)
            preview = Preview(
                title=data['title'],
                cover_picture=new_cover_picture
            )
            db.session.add(preview)
            db.session.commit()
            db.session.remove()
            flash(message='添加成功！', category='ok')
        except Exception as e:
            print(e.args)
        return redirect(url_for('admin.preview_add'))
    return render_template('admin/preview_add.html', form=form)

```
```python
# 电影预告列表
@admin.route("/preview/list/")
@admin_login_decorator
def preview_list(page=None):
    page_data = Preview.query.paginate(page=1, per_page=10)
    return render_template('admin/preview_list.html', page_data=page_data)
```
```python
# 电影预告删除
@admin.route('/preview/del/<int:id>/')
@admin_login_decorator
def preview_del(id):
    preview = Preview.query.filter_by(id=id).first_or_404()
    db.session.delete(preview)
    db.session.commit()
    db.session.remove()
    flash('删除成功！', category='ok')
    return redirect(url_for('admin.preview_list'))
```
( 18 ) 后台电影收藏管理
```python
# 收藏列表
@admin.route("/moviecol/list/<int:page>")
@admin_login_decorator
def moviecol_list(page=None):
    page_data = models.Moviecol.query.order_by(models.Moviecol.addtime.desc()).paginate(page=page, per_page=10)
    return render_template('admin/moviecol_list.html', page_data=page_data)
```
```python
# 删除电影收藏
@admin.route("/moviecol/del/<int:id>/", methods=["GET"])
@admin_login_decorator
def moviecol_del(id=None):
    moviecol = models.Moviecol.query.filter_by(id=id).first()
    db.session.delete(moviecol)
    db.session.commit()
    db.session.remove()
    return redirect(url_for('admin.moviecol_list', page=1))
```
( 19 ) 后台电影标签管理
```python
# 添加标签
@admin.route("/tag/add/", methods=["GET", "POST"])
@admin_login_decorator
def tag_add():
    form = TagForm()
    if form.validate_on_submit():
        data = form.data
        tag_count = Tag.query.filter_by(name=data['name']).count()
        if tag_count == 1:
            flash('标签已存在！', 'err')
            return redirect(url_for('admin.tag_add'))
        tag = Tag(name=data['name'])
        db.session.add(tag)
        db.session.commit()
        db.session.remove()
        flash('标签添加成功！', 'ok')
        return redirect(url_for('admin.tag_add'))
    return render_template('admin/tag_add.html', form=form)
```
```python
# 标签列表
@admin.route("/tag/list/<int:page>", methods=["GET"])
@admin_login_decorator
def tag_list(page=None):
    if page is None:
        page = 1
    page_data = Tag.query.order_by(
        Tag.add_time.desc()
    ).paginate(page=page, per_page=20)
    return render_template('admin/tag_list.html', page_data=page_data)
```
( 20 ) 后台电影评论管理
```python
# 评论列表
@admin.route("/comment/list/<int:page>/", methods=["GET"])
@admin_login_decorator
def comment_list(page=None):
    page_data = Comment.query.join(
        User
    ).join(
        Movie
    ).filter(
        User.id == Comment.user_id,
        Movie.id == Comment.movie_id
    ).order_by(
        Comment.add_time.desc()
    ).paginate(page=page, per_page=20)

    return render_template('admin/comment_list.html', page_data=page_data)
```
```python
# 删除评论
@admin.route("/comment/del/<int:id>/", methods=["GET"])
@admin_login_decorator
def comment_del(id=None):
    comment = Comment.query.filter_by(id=id).first_or_404()  # <Comment 45>
    """
    comment = Comment.query.filter_by(id=id)
    SELECT comment.id AS comment_id, comment.content AS comment_content, comment.add_time AS comment_add_time, comment.movie_id AS comment_movie_id, comment.user_id AS comment_user_id 
    FROM comment 
    WHERE comment.id = %(id_1)s
    """
    db.session.delete(comment)
    db.session.commit()
    db.session.remove()
    return redirect(url_for('admin.comment_list', page=1))
```
( 21 ) 后台管理员角色管理
```python
# 添加角色
@admin.route("/role/add/", methods=["GET", "POST"])
@admin_login_decorator
def role_add():
    form = RoleForm()
    if form.validate_on_submit():
        data = form.data
        print(data['auth'])
        # auth=",".join(data["auth"])  # 用逗号分隔开，拼接成字符串
        role = Role(name=data["name"], auth=",".join(map(lambda v: str(v), data["auth"])))
        db.session.add(role)
        db.session.commit()
        db.session.remove()
        flash("角色添加成功！", "ok")
        return redirect(url_for('admin.role_add'))
    return render_template('admin/role_add.html', form=form)
```
```python
# 角色列表
@admin.route("/role/list/<int:page>", methods=["GET"])
@admin_login_decorator
def role_list(page=None):
    if not page:
        page = 1
    page_data = Role.query.order_by(Role.add_time.desc()).paginate(page=page, per_page=5)
    return render_template('admin/role_list.html', page_data=page_data)
```
```python
# 角色编辑
@admin.route("/role/list/<int:id>", methods=["GET"])
@admin_login_decorator
def role_edit(page=None):
    if not page:
        page = 1
    page_data = Role.query.order_by(Role.add_time.desc()).paginate(page=page, per_page=5)
    return render_template('admin/role_list.html', page_data=page_data)
```
( 22 ) 后台管理员权限管理
```python
# 权限添加
@admin.route("/admin/auth/add/", methods=["GET", "POST"])
@admin_login_decorator
def auth_add():
    form = AuthForm()
    if form.validate_on_submit():
        data = form.data
        auth = Auth(name=data["name"], url=data["url"])
        db.session.add(auth)
        db.session.commit()
        db.session.remove()
        flash("权限添加成功！", "ok")
        return redirect(url_for('home.auth_add'))
    return render_template('admin/auth_add.html', form=form)
```
```python
# 权限列表
@admin.route("/admin/auth/list/<int:page>", methods=["GET"])
@admin_login_decorator
def auth_list(page=None):
    if not page:
        page = 1
    page_data = Auth.query.order_by(Auth.add_time.desc()).paginate(page=page, per_page=10)
    return render_template('admin/auth_list.html', page_data=page_data)
```
( 23 ) 前后台访问权限控制
```python
# 后台
def admin_login_decorator(func):
    @wraps(func)
    def inner(*args, **kwargs):
        if not session.get('admin'):
            return redirect(url_for('admin.login', next=request.url))
        return func(*args, **kwargs)

    return inner
```
```python
# 前台
def user_login_decorator(func):
    @wraps(func)
    def inner(*args, **kwargs):
        if not session.get('user'):
            return redirect(url_for('home.login', next=request.url))
        return func(*args, **kwargs)

    return inner
```
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
<div style="width: auto;height: auto;z-index: 99;position: fixed;right: 0;top: 70px;" id="google_ads">
        <div>
            <div style="width: 180px;height: auto"></div>
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
            <!-- Vertical -->
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-6937898095875663"
                 data-ad-slot="2927491642"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
            <script>
                 (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
        </div>
</div>