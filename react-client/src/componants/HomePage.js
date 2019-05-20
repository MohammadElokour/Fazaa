import React ,{Component} from 'react';

class HomePage extends Component {
	render(){
		return(

	<div className="gallary">
		<img id="mainImg" src="fazaa.png" alt="mainbackground" />
		<div className="row">
			<div className="col-md-6">
				<img
					id="firstImg"
					src="https://cdn-images-1.medium.com/max/1600/1*pBXdKxuvv5h-zBTioDE1PQ.jpeg"
					alt="traffic"
				/>
			</div>
			<div className="col-md-6">
				<p id="firstP">
					With Faza'a we will have less traffic; why? you might ask<br />
					its because we encourage people to come together and <br /> join eachother in the same ride.<br />
					a cherry on top is the result of less pollution.
				</p>
			</div>
		</div>

		<div className="row">
			<div className="col-md-6">
				<p id="secP">this is the 2nd paragraph and im happy yaaay</p>
			</div>
			<div className="col-md-6">
				<img
					id="secImg"
					src="https://hohoride.net/blog/wp-content/uploads/2017/09/download.jpg"
					alt="traffic"
				/>
			</div>
		</div>

		<div className="row">
			<div className="col-md-6">
				<img
					id="triImg"
					src="https://www.imoney.my/articles/wp-content/uploads/2018/11/SaveMoneyForCollegeOrForRetirement_1.jpg"
					alt="traffic"
				/>
			</div>
			<div className="col-md-6">
				<p id="triP">three tree three three thero</p>
			</div>
		</div>
	</div>
		)
	}

}


export default HomePage;
