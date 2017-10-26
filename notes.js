var NotesEditor = React.createClass({
	handleNoteToAdd: function () {
		var s = 2;
		s ++;
	},
	render: function () {
		return (
			<div className="note-editor">
				<textarea
					placeholder="Enter your note here..."
					rows={5}
					className="textarea"
				/>
				<button className="add-button" onClick={this.handleNoteToAdd} >Add</button>							
			</div>
		);
	}
});

var NotesGrid = React.createClass({
	componentDidMount: function(){
		var grid = this.refs.grid;
		var msnry = new Masonry( grid, {
			itemSelector: '.note',
            columnWidth: 200,
            gutter: 10,
            isFitWidth: true
		  });
	},
	render: function () {
		return (
			<div className="notes-grid" ref="grid">
				{
					
					this.props.notes.map(function(el) {
						var style = {backgroundColor: el.color};
						return <div key={el.id} className="note" style={style}>
									<span className="delete-note"> × </span>
									{el.text}
								</div>
					})
				}
			</div>
		);
	}
});

var NotesApp = React.createClass({
	getInitialState: function(){
		var notes = (function () {
			
			if (localStorage["notes"]) {
				return JSON.parse(localStorage["notes"]);
			}else{
				var localNotes = [
					{ id: 1, text:"111", color:"red" },
					{ id: 2, text:"222", color:"greed" },
					{ id: 3, text:"333", color:"gray" },
					{ id: 4, text:"444", color:"orange" },
					{ id: 5, text:"555", color:"yellow" },
				];
				localStorage["notes"] = JSON.stringify(localNotes);
				return localNotes;
			}
		})();
		return {
			notes: notes
		}
	},
	render: function(){
		return (
			 <div className="notes-app">
                <h2 className="app-header">NotesApp</h2>
				<NotesEditor />
                <NotesGrid notes={this.state.notes} />
            </div>
		)
	}
});

ReactDOM.render(<NotesApp />, document.getElementById("mount-point"));