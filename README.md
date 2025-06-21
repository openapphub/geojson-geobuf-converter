# GeoJSON to GeoBuf Converter

[![GitHub release](https://img.shields.io/github/v/release/openapphub/geojson-geobuf-converter)](https://github.com/openapphub/geojson-geobuf-converter/releases)
[![GitHub license](https://img.shields.io/github/license/openapphub/geojson-geobuf-converter)](https://github.com/openapphub/geojson-geobuf-converter/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/openapphub/geojson-geobuf-converter?style=social)](https://github.com/openapphub/geojson-geobuf-converter)
[![GitHub forks](https://img.shields.io/github/forks/openapphub/geojson-geobuf-converter?style=social)](https://github.com/openapphub/geojson-geobuf-converter)
[![Docker Pulls](https://img.shields.io/docker/pulls/openapphub/geojson-geobuf-converter)](https://hub.docker.com/r/openapphub/geojson-geobuf-converter)
[![CI/CD](https://github.com/openapphub/geojson-geobuf-converter/workflows/CI/CD%20Pipeline/badge.svg)](https://github.com/openapphub/geojson-geobuf-converter/actions)
[![Test Coverage](https://img.shields.io/codecov/c/github/openapphub/geojson-geobuf-converter)](https://codecov.io/gh/openapphub/geojson-geobuf-converter)
[![Code Quality](https://img.shields.io/lgtm/grade/javascript/g/openapphub/geojson-geobuf-converter.svg)](https://lgtm.com/projects/g/openapphub/geojson-geobuf-converter)
[![Contributors](https://img.shields.io/github/contributors/openapphub/geojson-geobuf-converter)](https://github.com/openapphub/geojson-geobuf-converter/graphs/contributors)
[![Issues](https://img.shields.io/github/issues/openapphub/geojson-geobuf-converter)](https://github.com/openapphub/geojson-geobuf-converter/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

[English](#english) | [中文](#chinese)

---

A high-performance GeoJSON to GeoBuf compression and decompression tool with a modern web interface. This tool helps reduce map data file sizes by 60-80% while maintaining full data integrity.

### 🚀 Features

- 🗜️ **Efficient Compression**: Compress GeoJSON files to GeoBuf format, reducing file size by 60-80%
- 📦 **Fast Decompression**: Decompress GeoBuf files back to GeoJSON format
- 📊 **File Information**: View detailed information about map files
- 🌐 **Modern Web Interface**: User-friendly web interface with drag-and-drop support
- ⚡ **High Performance**: Built on pbf library for fast processing
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 🔄 **Bidirectional Conversion**: Support both compression and decompression

### 🛠️ Technology Stack

- **Backend**: Node.js + Express
- **Compression Library**: geobuf + pbf
- **File Upload**: multer
- **Frontend**: HTML5 + CSS3 + JavaScript
- **Containerization**: Docker

### 🚀 Quick Start

#### Using Docker (Recommended)

```bash
# Pull and run with Docker
docker run -d -p 3000:3000 --name geojson-converter openapphub/geojson-geobuf-converter

# Or build and run locally
git clone https://github.com/openapphub/geojson-geobuf-converter.git
cd geojson-geobuf-converter
docker build -t geojson-converter .
docker run -d -p 3000:3000 --name geojson-converter geojson-converter
```

#### Manual Installation

```bash
# Clone the repository
git clone https://github.com/openapphub/geojson-geobuf-converter.git
cd geojson-geobuf-converter

# Install dependencies
npm install

# Start the application
npm start

# For development
npm run dev
```

Visit http://localhost:3000 to use the application.

### 📁 Project Structure

```
geojson-geobuf-converter/
├── index.js              # Main server file
├── package.json           # Project configuration
├── README.md             # Project documentation
├── Dockerfile            # Docker configuration
├── .dockerignore         # Docker ignore file
├── public/               # Static files directory
│   └── index.html        # Web interface
├── uploads/              # Temporary upload directory (auto-created)
└── output/               # Output files directory (auto-created)
```

### 🔌 API Endpoints

#### Compress GeoJSON

- **URL**: `/api/compress`
- **Method**: POST
- **Content-Type**: multipart/form-data
- **Parameters**: file (GeoJSON file)
- **Response**: Compression result and download link

#### Decompress GeoBuf

- **URL**: `/api/decompress`
- **Method**: POST
- **Content-Type**: multipart/form-data
- **Parameters**: file (GeoBuf file)
- **Response**: Decompression result and download link

#### Get File Information

- **URL**: `/api/info`
- **Method**: POST
- **Content-Type**: multipart/form-data
- **Parameters**: file (GeoJSON or GeoBuf file)
- **Response**: Detailed file information

#### Download File

- **URL**: `/api/download/:filename`
- **Method**: GET
- **Response**: File download

### 📖 Usage Guide

1. **Compress GeoJSON Files**:

   - Select the "Compress GeoJSON" tab
   - Upload a .json or .geojson file
   - Click "Start Compression"
   - Download the compressed .pbf file

2. **Decompress GeoBuf Files**:

   - Select the "Decompress GeoBuf" tab
   - Upload a .pbf file
   - Click "Start Decompression"
   - Download the decompressed .geojson file

3. **View File Information**:
   - Select the "File Info" tab
   - Upload any supported file
   - Click "Get Info"
   - View detailed file information

### 📋 Supported File Formats

- **Input Formats**: .json, .geojson, .pbf
- **Output Formats**: .pbf (compression), .geojson (decompression)

### 📊 Performance

Based on testing, GeoBuf format compared to GeoJSON achieves:

- 60-80% reduction in file size
- 3-5x faster parsing speed
- Significantly reduced network transmission time

### ⚠️ Important Notes

- Uploaded files are automatically cleaned up after processing
- Generated files are automatically deleted 1 minute after download
- Supports large file processing, but recommends single files under 100MB
- Ensure uploaded GeoJSON files are properly formatted

### 🐳 Docker Deployment

#### Using Docker Compose

Create a `docker-compose.yml` file:

```yaml
version: '3.8'
services:
  geojson-converter:
    image: openapphub/geojson-geobuf-converter:latest
    container_name: geojson-converter
    ports:
      - '3000:3000'
    volumes:
      - ./uploads:/app/uploads
      - ./output:/app/output
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```

Run with:

```bash
docker-compose up -d
```

#### Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (development/production)

### 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and contribute to the project.

### 📋 Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

### 🔒 Security

If you discover a security vulnerability, please report it to [security@openapphub.com](mailto:security@openapphub.com). See our [Security Policy](SECURITY.md) for more details.

### 🐛 Issues and Feature Requests

- **Bug Reports**: Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md)
- **Feature Requests**: Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md)
- **General Questions**: Start a [GitHub Discussion](https://github.com/openapphub/geojson-geobuf-converter/discussions)

### 📊 Project Status

- **Version**: 1.0.0
- **Status**: Active Development
- **Maintenance**: Regular updates and security patches
- **Support**: Community-driven with maintainer oversight

### 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=openapphub/geojson-geobuf-converter&type=Date)](https://star-history.com/#openapphub/geojson-geobuf-converter&Date)

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### 🙏 Acknowledgments

- [GeoBuf Project](https://github.com/mapbox/geobuf) - The core compression library
- [Protocol Buffers](https://developers.google.com/protocol-buffers) - Binary serialization format

---

## Chinese

基于Node.js和Express框架开发的高性能地图数据压缩解码工具，具有现代化的Web界面。该工具可以将地图数据文件大小减少60-80%，同时保持完整的数据完整性。

### 🚀 功能特点

- 🗜️ **高效压缩**: 将GeoJSON文件压缩为GeoBuf格式，文件大小减少60-80%
- 📦 **快速解压**: 将GeoBuf文件解压回GeoJSON格式
- 📊 **文件信息**: 查看地图文件的详细信息
- 🌐 **现代化界面**: 友好的Web界面，支持拖拽上传
- ⚡ **高性能**: 基于pbf库，处理速度快
- 📱 **响应式设计**: 完美支持桌面和移动设备
- 🔄 **双向转换**: 支持压缩和解压缩

### 🛠️ 技术栈

- **后端**: Node.js + Express
- **压缩库**: geobuf + pbf
- **文件上传**: multer
- **前端**: HTML5 + CSS3 + JavaScript
- **容器化**: Docker

### 🚀 快速开始

#### 使用Docker（推荐）

```bash
# 拉取并运行Docker镜像
docker run -d -p 3000:3000 --name geojson-converter openapphub/geojson-geobuf-converter

# 或者本地构建运行
git clone https://github.com/openapphub/geojson-geobuf-converter.git
cd geojson-geobuf-converter
docker build -t geojson-converter .
docker run -d -p 3000:3000 --name geojson-converter geojson-converter
```

#### 手动安装

```bash
# 克隆仓库
git clone https://github.com/openapphub/geojson-geobuf-converter.git
cd geojson-geobuf-converter

# 安装依赖
npm install

# 启动应用
npm start

# 开发模式
npm run dev
```

访问 http://localhost:3000 使用应用。

### 📁 项目结构

```
geojson-geobuf-converter/
├── index.js              # 主服务器文件
├── package.json           # 项目配置
├── README.md             # 项目文档
├── Dockerfile            # Docker配置
├── .dockerignore         # Docker忽略文件
├── public/               # 静态文件目录
│   └── index.html        # Web界面
├── uploads/              # 临时上传目录（自动创建）
└── output/               # 输出文件目录（自动创建）
```

### 🔌 API接口

#### 压缩GeoJSON

- **URL**: `/api/compress`
- **Method**: POST
- **Content-Type**: multipart/form-data
- **参数**: file (GeoJSON文件)
- **返回**: 压缩结果和下载链接

#### 解压GeoBuf

- **URL**: `/api/decompress`
- **Method**: POST
- **Content-Type**: multipart/form-data
- **参数**: file (GeoBuf文件)
- **返回**: 解压结果和下载链接

#### 获取文件信息

- **URL**: `/api/info`
- **Method**: POST
- **Content-Type**: multipart/form-data
- **参数**: file (GeoJSON或GeoBuf文件)
- **返回**: 文件详细信息

#### 下载文件

- **URL**: `/api/download/:filename`
- **Method**: GET
- **返回**: 文件下载

### 📖 使用指南

1. **压缩GeoJSON文件**:

   - 选择"压缩GeoJSON"标签页
   - 上传.json或.geojson文件
   - 点击"开始压缩"
   - 下载压缩后的.pbf文件

2. **解压GeoBuf文件**:

   - 选择"解压GeoBuf"标签页
   - 上传.pbf文件
   - 点击"开始解压"
   - 下载解压后的.geojson文件

3. **查看文件信息**:
   - 选择"文件信息"标签页
   - 上传任意支持的文件
   - 点击"获取信息"
   - 查看文件详细信息

### 📋 支持的文件格式

- **输入格式**: .json, .geojson, .pbf
- **输出格式**: .pbf (压缩), .geojson (解压)

### 📊 性能表现

根据测试，GeoBuf格式相比GeoJSON可以达到：

- 文件大小减少60-80%
- 解析速度提升3-5倍
- 网络传输时间显著减少

### ⚠️ 注意事项

- 上传的文件会在处理后自动清理
- 生成的文件会在下载后1分钟自动删除
- 支持大文件处理，但建议单个文件不超过100MB
- 确保上传的GeoJSON文件格式正确

### 🐳 Docker部署

#### 使用Docker Compose

创建 `docker-compose.yml` 文件：

```yaml
version: '3.8'
services:
  geojson-converter:
    image: openapphub/geojson-geobuf-converter:latest
    container_name: geojson-converter
    ports:
      - '3000:3000'
    volumes:
      - ./uploads:/app/uploads
      - ./output:/app/output
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```

运行命令：

```bash
docker-compose up -d
```

#### 环境变量

- `PORT`: 服务器端口（默认: 3000）
- `NODE_ENV`: 环境模式（development/production）

### 🤝 贡献指南

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and contribute to the project.

### 📋 Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

### 🔒 Security

If you discover a security vulnerability, please report it to [security@openapphub.com](mailto:security@openapphub.com). See our [Security Policy](SECURITY.md) for more details.

### 🐛 Issues and Feature Requests

- **Bug Reports**: Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md)
- **Feature Requests**: Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md)
- **General Questions**: Start a [GitHub Discussion](https://github.com/openapphub/geojson-geobuf-converter/discussions)

### 📊 Project Status

- **Version**: 1.0.0
- **Status**: Active Development
- **Maintenance**: Regular updates and security patches
- **Support**: Community-driven with maintainer oversight

### 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=openapphub/geojson-geobuf-converter&type=Date)](https://star-history.com/#openapphub/geojson-geobuf-converter&Date)

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### 🙏 致谢

- [GeoBuf项目](https://github.com/mapbox/geobuf) - 核心压缩库
- [Protocol Buffers](https://developers.google.com/protocol-buffers) - 二进制序列化格式

---

<div align="center">

**Made with ❤️ by [OpenAppHub](https://github.com/openapphub)**

[![GitHub stars](https://img.shields.io/github/stars/openapphub/geojson-geobuf-converter?style=social)](https://github.com/openapphub/geojson-geobuf-converter)
[![GitHub forks](https://img.shields.io/github/forks/openapphub/geojson-geobuf-converter?style=social)](https://github.com/openapphub/geojson-geobuf-converter)
[![GitHub issues](https://img.shields.io/github/issues/openapphub/geojson-geobuf-converter)](https://github.com/openapphub/geojson-geobuf-converter/issues)
[![GitHub license](https://img.shields.io/github/license/openapphub/geojson-geobuf-converter)](https://github.com/openapphub/geojson-geobuf-converter/blob/main/LICENSE)

</div>
