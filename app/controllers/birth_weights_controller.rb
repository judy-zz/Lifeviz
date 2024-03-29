class BirthWeightsController < ApplicationController
  before_filter :find_species, :require_user
  
  def new
    @birth_weight = @species.birth_weights.new
  end
  
  def create
    @birth_weight = BirthWeight.new(params[:birth_weight])
    @birth_weight.species = @species
    if @birth_weight.save
      flash[:success] = "Birth weight created."
      flash[:karma_updated] = true
      flash[:karma_increased] = "You just received 1 point of karma for contributing a new annotation. Your total karma is now #{current_user.karma.total}!"
      redirect_to @species
    else
      flash.now[:failure] = "Birth weight annotation failed becase ", @birth_weight.errors.full_messages.to_sentence.downcase, "."
      render :new
    end
  end
  
  def edit
    @birth_weight = BirthWeight.find(params[:id])
  end
  
  def update
    @birth_weight = BirthWeight.find(params[:id])
    if @birth_weight.update_attributes(params[:birth_weight])
      flash[:success] = "Birth weight updated."
      redirect_to @species
    else
      flash.now[:failure] = "Birth weight update failed."
      render :edit
    end
  end
  
  def destroy
    @birth_weight = BirthWeight.find(params[:id])
    @birth_weight.destroy
    flash[:success] = "Birth weight deleted."
    redirect_to @species
  end
    
  private
  
  def find_species
    @species = Species.find(params[:species_id])
  end
  
end